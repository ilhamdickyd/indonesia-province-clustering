# Dashboard Analisis Klaster Provinsi Indonesia

## Daftar Isi

  * [Tentang Proyek](https://www.google.com/search?q=%23tentang-proyek)
  * [Fitur Dashboard](https://www.google.com/search?q=%23fitur-dashboard)
  * [Teknologi yang Digunakan](https://www.google.com/search?q=%23teknologi-yang-digunakan)
  * [Alur Analisis Data](https://www.google.com/search?q=%23alur-analisis-data)
  * [Instalasi & Menjalankan Proyek](https://www.google.com/search?q=%23instalasi--menjalankan-proyek)
  * [Hasil & Temuan](https://www.google.com/search?q=%23hasil--temuan)
  * [Kontak](https://www.google.com/search?q=%23kontak)

-----

## Tentang Proyek

Proyek ini bertujuan untuk melakukan segmentasi atau pemetaan provinsi di seluruh Indonesia berdasarkan karakteristik kesejahteraan masyarakatnya. Dengan menggunakan data resmi statistik dari BPS periode 2010-2023, analisis ini mengelompokkan provinsi-provinsi ke dalam klaster-klaster yang memiliki profil serupa.

Hasil dari analisis ini disajikan dalam bentuk dashboard web interaktif yang memungkinkan pengguna untuk mengeksplorasi profil setiap klaster, membandingkannya, dan memahami heterogenitas kondisi sosial-ekonomi di Indonesia. Dashboard ini juga memberikan kerangka untuk menganalisis potensi dampak dari guncangan ekonomi, seperti inflasi, terhadap daerah dengan tingkat kerentanan yang berbeda.

-----

## Fitur Dashboard

  * **Peta Interaktif:** Peta koroplet yang mewarnai setiap provinsi sesuai dengan klasternya, dilengkapi dengan tooltip informatif.
  * **Filter Dinamis:** Pengguna dapat memfokuskan visualisasi pada klaster tertentu, dan peta akan menyorot provinsi yang relevan secara real-time.
  * **Grafik Komparatif:** Berbagai jenis grafik (Bar, Pie, Line) untuk membandingkan profil setiap klaster dan melihat tren data dari waktu ke waktu.
  * **Desain Responsif:** Tampilan yang dioptimalkan untuk berbagai ukuran layar.

-----

## Teknologi yang Digunakan

Proyek ini menggabungkan dua disiplin ilmu: Analisis Data dan Pengembangan Web.

**Analisis Data (di Google Colab):**

  * **Python**
  * **Pandas** & **GeoPandas** untuk manipulasi data.
  * **Scikit-learn** untuk pemodelan K-Means Clustering.
  * **Matplotlib** untuk visualisasi awal.

**Frontend Dashboard (di Vercel):**

  * **Next.js** (React Framework)
  * **Tailwind CSS** untuk styling.
  * **Recharts** untuk grafik interaktif.
  * **React-Leaflet** untuk peta interaktif.
  * **Git LFS** untuk manajemen file data besar di GitHub.

-----

## Alur Analisis Data

Dashboard ini dibangun di atas analisis data yang solid dengan alur sebagai berikut:

1.  **Pengumpulan & Pembersihan Data:** Menggabungkan 5 dataset dari BPS dan melakukan pembersihan untuk mengatasi inkonsistensi data.
2.  **Agregasi & Standardisasi:** Menghitung profil rata-rata setiap provinsi dan melakukan standardisasi skala data.
3.  **Penentuan Jumlah Klaster:** Menggunakan **Metode Siku (Elbow Method)** dan **Skor Siluet (Silhouette Score)** untuk menentukan jumlah klaster paling optimal, yaitu **7 klaster**.
4.  **Pemodelan K-Means:** Menjalankan algoritma K-Means untuk mengelompokkan 34 provinsi ke dalam 7 klaster.
5.  **Interpretasi Hasil:** Menganalisis profil setiap klaster untuk memberikan nama dan makna yang deskriptif.

-----

## Instalasi & Menjalankan Proyek

Untuk menjalankan proyek ini di komputer lokal Anda:

1.  **Prasyarat:** Pastikan Anda sudah menginstall [Node.js](https://nodejs.org/en/) dan [Git LFS](https://git-lfs.com).

2.  **Clone Repositori:**

    ```bash
    git clone https://github.com/IlhamDickyDarmawan/dashboard-klaster-provinsi.git
    cd dashboard-klaster-provinsi
    ```

3.  **Tarik File LFS:**
    Perintah ini akan mengunduh file peta `.geojson` yang besar.

    ```bash
    git lfs pull
    ```

4.  **Install Dependencies:**

    ```bash
    npm install
    ```

5.  **Jalankan Server Pengembangan:**

    ```bash
    npm run dev
    ```

6.  Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di browser Anda.

-----

## Hasil & Temuan

Analisis berhasil mengidentifikasi **7 profil provinsi** yang unik, mulai dari **'Pusat Ekonomi Unggul'** (DKI Jakarta) yang memiliki ketahanan ekonomi tertinggi, **'Menengah Stabil'** yang menjadi profil mayoritas provinsi, hingga **'Rentan (Perhatian Khusus)'** (Papua, NTT, dll) yang menunjukkan tingkat kesejahteraan paling rendah dan paling rentan terhadap guncangan ekonomi.

-----

## Kontak

Ilham Dicky Darmawan - [GitHub Profile](https://www.google.com/search?q=https://github.com/IlhamDickyDarmawan)

*Project Link:* [https://github.com/IlhamDickyDarmawan/dashboard-klaster-provinsi](https://www.google.com/search?q=https://github.com/IlhamDickyDarmawan/dashboard-klaster-provinsi)
