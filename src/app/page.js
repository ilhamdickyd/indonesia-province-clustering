"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  MapPin,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Filter,
  BarChart3,
} from "lucide-react";
import { ScaleLoader } from "react-spinners";
import Papa from "papaparse";

// Warna untuk 7 Klaster
const PALET_WARNA = [
  "#3b82f6",
  "#10b981",
  "#f97316",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#facc15",
];
const getColor = (k) => PALET_WARNA[k] || "#6b7280";

// Dynamic import Map
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-200 rounded-lg">
      <ScaleLoader color="#475569" />
    </div>
  ),
});

export default function DashboardPage() {
  const [profilKlaster, setProfilKlaster] = useState([]);
  const [geojsonData, setGeojsonData] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [overallStats, setOverallStats] = useState({});
  const [pieData, setPieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKlaster, setSelectedKlaster] = useState("all");

  useEffect(() => {
    Promise.all([
      fetch("/data/klaster_provinsi.json").then((res) => res.json()),
      fetch("/data/profil_klaster.json").then((res) => res.json()),
      fetch("/data/peta_indonesia.geojson").then((res) => res.json()),
      fetch("/data/data_provinsi_gabungan.csv").then((res) => res.text()),
    ])
      .then(([dataKlaster, dataProfil, dataGeo, dataGabunganCsv]) => {
        // Mengolah data profil klaster
        const profilArray = Object.entries(dataProfil).map(
          ([klaster, values]) => ({
            klaster: `Klaster ${klaster}`,
            klasterNum: parseInt(klaster),
            ...values,
          })
        );
        setProfilKlaster(profilArray);
        setGeojsonData(dataGeo);

        // Mengolah data Pie Chart
        const pieDataArray = profilArray.map((item) => ({
          name: item.klaster,
          value: dataKlaster.filter((p) => p.klaster === item.klasterNum)
            .length,
          color: getColor(item.klasterNum),
        }));
        setPieData(pieDataArray);

        // Mengolah data CSV
        const parsedData = Papa.parse(dataGabunganCsv, {
          header: true,
          dynamicTyping: true,
        }).data.filter((row) => row.nama_provinsi);

        // Kalkulasi untuk Kartu Statistik (rata-rata seluruh periode)
        const totalRows = parsedData.length;
        if (totalRows > 0) {
          setOverallStats({
            totalProvinsi: 34, // Dari data klaster
            avgIPM:
              parsedData.reduce((acc, row) => acc + row.ipm, 0) / totalRows,
            avgKemiskinan:
              parsedData.reduce((acc, row) => acc + row.kemiskinan, 0) /
              totalRows,
            avgPengeluaran:
              parsedData.reduce((acc, row) => acc + row.pengeluaran, 0) /
              totalRows,
          });
        }

        // Kalkulasi data tren (rata-rata nasional per tahun)
        const groupByYear = parsedData.reduce((acc, row) => {
          const year = row.tahun;
          if (!acc[year]) {
            acc[year] = { kemiskinan: 0, pengeluaran: 0, ipm: 0, count: 0 };
          }
          acc[year].kemiskinan += row.kemiskinan;
          acc[year].pengeluaran += row.pengeluaran;
          acc[year].ipm += row.ipm;
          acc[year].count++;
          return acc;
        }, {});

        const trendDataArray = Object.entries(groupByYear)
          .map(([year, values]) => ({
            tahun: parseInt(year),
            kemiskinan: values.kemiskinan / values.count,
            pengeluaran: values.pengeluaran / values.count,
            ipm: values.ipm / values.count,
          }))
          .sort((a, b) => a.tahun - b.tahun);
        setTrendData(trendDataArray);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setIsLoading(false);
      });
  }, []);

  const styleGeoJSON = (feature) => {
    const klaster = feature.properties.klaster;
    const isSelected = selectedKlaster === "all" || klaster === selectedKlaster;
    return {
      fillColor: getColor(klaster),
      weight: isSelected ? 2 : 1,
      opacity: 1,
      color: isSelected ? "#1e40af" : "white",
      fillOpacity: isSelected ? 0.7 : 0.35,
    };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <ScaleLoader color="#475569" />
        <p className="mt-4 text-slate-600">Mempersiapkan Dashboard...</p>
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Dashboard Analisis Klaster Provinsi
          </h1>
          <p className="text-lg text-slate-500 mt-1">
            Profil Kesejahteraan Provinsi di Indonesia Berdasarkan Data
            2010-2023
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<MapPin className="w-8 h-8 text-blue-600" />}
            title="Total Provinsi"
            value={overallStats.totalProvinsi || 0}
          />
          <StatCard
            icon={<Activity className="w-8 h-8 text-green-600" />}
            title="Rata-rata IPM"
            value={(overallStats.avgIPM || 0).toFixed(2)}
          />
          <StatCard
            icon={<Users className="w-8 h-8 text-red-600" />}
            title="Tingkat Kemiskinan"
            value={`${(overallStats.avgKemiskinan || 0).toFixed(2)}%`}
          />
          <StatCard
            icon={<DollarSign className="w-8 h-8 text-yellow-600" />}
            title="Pengeluaran/Kapita"
            value={`${(overallStats.avgPengeluaran || 0).toFixed(2)} Jt`}
          />
        </div>

        {/* Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              Fokus Pada Klaster
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              label="Tampilkan Semua"
              isActive={selectedKlaster === "all"}
              onClick={() => setSelectedKlaster("all")}
            />
            {profilKlaster.map((item) => (
              <FilterButton
                key={item.klasterNum}
                label={`Klaster ${item.klasterNum}`}
                isActive={selectedKlaster === item.klasterNum}
                onClick={() => setSelectedKlaster(item.klasterNum)}
                color={getColor(item.klasterNum)}
              />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Peta Persebaran Klaster
            </h2>
            <div className="h-[55vh] w-full">
              <Map geojsonData={geojsonData} styleGeoJSON={styleGeoJSON} />
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Distribusi Provinsi per Klaster
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name.split(" ")[1]}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>
                    {item.name}: {item.value} provinsi
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" /> Profil Rata-rata Klaster
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={profilKlaster}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="klaster"
                  width={80}
                  stroke="#475569"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  dataKey="kemiskinan"
                  fill="#ef4444"
                  name="Kemiskinan (%)"
                  radius={[0, 4, 4, 0]}
                />
                <Bar
                  dataKey="pengeluaran"
                  fill="#3b82f6"
                  name="Pengeluaran (Juta Rp)"
                  radius={[0, 4, 4, 0]}
                />
                <Bar
                  dataKey="ipm"
                  fill="#10b981"
                  name="IPM"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> Tren Nasional (2010-2023)
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tahun" />
                <YAxis yAxisId="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="kemiskinan"
                  stroke="#ef4444"
                  name="Kemiskinan (%)"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="ipm"
                  stroke="#10b981"
                  name="IPM"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="pengeluaran"
                  stroke="#3b82f6"
                  name="Pengeluaran (Juta)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper components
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
    <div className="bg-slate-100 p-3 rounded-full">{icon}</div>
  </div>
);

const FilterButton = ({ label, isActive, onClick, color }) => {
  const baseStyle =
    "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 border-transparent";
  const activeStyle = `text-white shadow-lg`;
  const inactiveStyle = "bg-slate-100 text-slate-700 hover:bg-slate-200";
  const activeColor = color
    ? { backgroundColor: color, borderColor: color }
    : { backgroundColor: "#1e293b", borderColor: "#1e293b" };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}
      style={isActive ? activeColor : {}}
    >
      {label}
    </button>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-4 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-bold text-slate-800 mb-2">{`${label}`}</p>
        {payload.map((pld) => (
          <div key={pld.dataKey} style={{ color: pld.fill }}>
            {`${pld.name} : ${pld.value.toFixed(2)}`}
          </div>
        ))}
      </div>
    );
  }
  return null;
};
