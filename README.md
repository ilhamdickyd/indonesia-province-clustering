# Uncovering Development Patterns Across Indonesia (2010-2023): A Clustering Analysis

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Project Screenshot]([URL_SCREENSHOT_ANDA])

An end-to-end data science project that performs a clustering analysis on Indonesia's 34 provinces based on their development and welfare profiles. The results are presented through a fully interactive web dashboard built from scratch.

**[➡️ View Live Dashboard](https://dashboard-klaster-provinsi.vercel.app/)** | **[➡️ Read the Full Analysis on Medium](https://medium.com/@ilham.dicky.darmawan/analisis-clustering-untuk-memahami-profil-pembangunan-34-provinsi-di-indonesia-6ce688427bff)**

---

## Table of Contents
- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Analysis Workflow](#analysis-workflow)
- [Getting Started](#getting-started)
- [Results & Findings](#results--findings)
- [Contact](#contact)

---

## About The Project

This project aims to segment Indonesia's 34 provinces based on their socio-economic welfare characteristics. Using official statistical data from BPS (Statistics Indonesia) for the 2010-2023 period, this analysis groups provinces into distinct clusters with similar development profiles.

The final output is an interactive web dashboard that allows users to explore each cluster's profile, compare them, and understand the heterogeneity of socio-economic conditions across Indonesia.

## Key Features

- ✅ **Interactive Choropleth Map:** Colors each province according to its assigned cluster, complete with informative tooltips.
- ✅ **Dynamic Filtering:** Users can focus the visualization on specific clusters, and the map will highlight the relevant provinces in real-time.
- ✅ **Comparative Charts:** A variety of charts (Bar, Pie, Line) to compare each cluster's profile and observe data trends over time.
- ✅ **Fully Responsive Design:** Optimized for various screen sizes, from mobile to desktop.

## Tech Stack

This project combines two main disciplines: Data Analysis and Web Development.

| Category | Technologies Used |
| :--- | :--- |
| **Data Analysis** | `Python`, `Pandas`, `GeoPandas`, `Scikit-learn`, `Matplotlib`, `Seaborn` |
| **Frontend Dashboard** | `Next.js`, `React`, `TypeScript`, `Tailwind CSS`, `Recharts`, `React-Leaflet` |

## Analysis Workflow

The dashboard is built upon a solid data analysis workflow as follows:
1.  **Data Collection & Cleaning:** Merged and cleaned 5 datasets from BPS to handle inconsistencies.
2.  **Standardization:** Performed data scaling to prepare features for modeling.
3.  **Optimal Cluster Determination:** Used the **Elbow Method** and **Silhouette Score** to determine that **7 clusters** was the optimal number.
4.  **K-Means Modeling:** Executed the K-Means algorithm to group the 34 provinces into the 7 identified clusters.
5.  **Cluster Interpretation:** Analyzed each cluster's profile to assign a descriptive name and meaning.

## Getting Started

To run this project on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [Git LFS](https://git-lfs.com) (This project uses Git LFS for handling large map files)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [URL_GITHUB_REPO_ANDA]
    cd [nama-folder-repository]
    ```

2.  **Pull LFS files:**
    This command will download the large `.geojson` map file needed for the visualization.
    ```bash
    git lfs pull
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Results & Findings

The analysis successfully identified **7 unique provincial profiles**, ranging from the **'Advanced Economic Hub'** (DKI Jakarta), which has the highest economic resilience, and the **'Stable Middle'** profile, which includes the majority of provinces, down to the **'Vulnerable Cluster'** (e.g., Papua, NTT), which exhibits the lowest welfare levels and is most susceptible to economic shocks.

---

## Contact

**Ilham Dicky Darmawan**

[ilham.dicky.darmawan@gmail.com](mailto:ilham.dicky.darmawan@gmail.com) | [LinkedIn](https://www.linkedin.com/in/ilham-dicky-darmawan) | [GitHub](https://github.com/ilhamdickyd)