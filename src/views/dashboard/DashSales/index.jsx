import { Bar, Line } from "react-chartjs-2";
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Dashboard } from '../../../services/dashboardService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);


export default function DashSales() {
  const [summary, setSummary] = useState(null);
  const [kalangan, setKalangan] = useState([]);
  const [iklan, setIklan] = useState([]);
  const [top10Webinar, setTop10Webinar] = useState([]);
  const [top10Kalangan, setTop10Kalangan] = useState([]);

  const fetchData = async () => {
    try {
      const res = await Dashboard();

      setSummary(res.summary);
      setKalangan(res.kalangan || []);
      setIklan(res.iklan || []);
      setTop10Webinar(res.webinar || []);
      setTop10Kalangan(res.kalangan_terbanyak || []);

      console.log("DASHBOARD RESPONSE:", res);
    } catch (error) {
      console.error("Gagal load dashboard:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPendaftar = top10Kalangan.reduce(
    (sum, item) => sum + Number(item.total_peserta || 0),
    0
  );
  /* ===================== DATA ===================== */

  const KalanganChart = {
    labels: kalangan.map((k) => k.nama_kalangan),
    datasets: [
      {
        data: kalangan.map((k) => k.total_peserta),
        backgroundColor: "#ffffff",
        borderRadius: 6,
      },
    ],
  };

  const IklanChart = {
    labels: iklan.map((i) => i.nama_iklan),
    datasets: [
      {
        label: "Total Biaya Iklan",
        data: iklan.map((i) => Number(i.total_biaya_iklan)),
        borderColor: "#9ad0ff",
        backgroundColor: "#9ad0ff",
        tension: 0.4,
      },
      {
        label: "Keuntungan",
        data: iklan.map((i) => Number(i.total_pendapatan)),
        borderColor: "#0b1e3b",
        backgroundColor: "#0b1e3b",
        tension: 0.4,
      },
    ],
  };

  const webinarData = {
    labels: top10Webinar.map(item => item.nama_webinar),
    datasets: [
      {
        data: top10Webinar.map(item => item.total_peserta),
        backgroundColor: "#ffffff",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#fff", font: { size: 10 } },
      },
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  const horizontalOptions = {
    ...chartOptions,
    indexAxis: "y",
  };

  /* ===================== RENDER ===================== */

  return (
    <>
      {/* LOCK SCROLL */}
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          overflow: hidden;
        }
      `}</style>

      <div style={styles.page}>
        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>Marketing Campaign Insights Analysis</h1>
        </div>

        {/* KPI */}
        <div style={styles.kpiGrid}>
          <KPI
            title="Keuntungan"
            value={`Rp${Number(summary?.keuntungan || 0).toLocaleString("id-ID")}`}
          />

          <KPI
            title="Laba atas Investasi"
            value={`Rp${Number(summary?.laba_persen || 0).toLocaleString("id-ID")}`}
          />

          <KPI
            title="Total Pendapatan"
            value={`Rp${Number(summary?.total_pendapatan || 0).toLocaleString("id-ID")}`}
          />

          <KPI
            title="Total Biaya Iklan"
            value={`Rp${Number(summary?.total_biaya_iklan || 0).toLocaleString("id-ID")}`}
          />
        </div>

        {/* MAIN GRID */}
        <div style={styles.mainGrid}>
          {/* ROW 1 */}
          <Panel title="Jumlah yang Hadir Berdasarkan Target">
            {kalangan.length > 0 && (
              <Bar data={KalanganChart} options={chartOptions} />
            )}
          </Panel>

          <Panel title="Perbandingan Biaya Iklan & Keuntungan">
            {iklan.length > 0 && (
              <Line data={IklanChart} options={chartOptions} />
            )}
          </Panel>

          {/* ROW 2 */}
          <Panel title="10 Webinar Terpopuler">
            <Bar data={webinarData} options={horizontalOptions} />
          </Panel>

          <Panel title="Partisipasi">
            <table style={styles.table}>
              <thead>
                <tr>
                  <th align="left">Target</th>
                  <th align="right">Pendaftar</th>
                  <th align="right">Hadir</th>
                </tr>
              </thead>
              <tbody>
                {top10Kalangan.map((item, index) => (
                  <tr key={index}>
                    <td>{item.nama_kalangan}</td>
                    <td align="right">{item.total_peserta}</td>
                    <td align="right">{item.total_peserta}</td>
                  </tr>
                ))}

                {/* TOTAL */}
                <tr style={{ fontWeight: 700, borderTop: '1px solid #fff' }}>
                  <td>Total</td>
                  <td align="right">{totalPendaftar}</td>
                  <td align="right">{totalPendaftar}</td>
                </tr>
              </tbody>
            </table>
          </Panel>
        </div>
      </div>
    </>
  );
}

/* ===================== COMPONENT ===================== */

const KPI = ({ title, value }) => (
  <div style={styles.kpiCard}>
    <div style={styles.kpiValue}>{value}</div>
    <div style={styles.kpiTitle}>{title}</div>
  </div>
);

const Panel = ({ title, children }) => (
  <div style={styles.panel}>
    <h3 style={styles.panelTitle}>{title}</h3>
    <div style={styles.chartWrapper}>{children}</div>
  </div>
);

/* ===================== STYLES ===================== */

const styles = {
  page: {
    height: "90vh",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    background:
      "linear-gradient(135deg, #0b1e3b 0%, #0f3d6e 50%, #0b1e3b 100%)",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(120,180,255,0.6)",
    padding: "12px 20px",
    borderRadius: 14,
    marginBottom: 14,
  },

  title: { fontSize: 20, fontWeight: 700 },

  badge: {
    background: "#1e88e5",
    padding: "6px 14px",
    borderRadius: 16,
    fontSize: 12,
  },

  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 14,
    marginBottom: 14,
  },

  kpiCard: {
    background: "linear-gradient(180deg,#7cb3ff,#4b83d6)",
    borderRadius: 16,
    padding: 14,
    textAlign: "center",
  },

  kpiValue: { fontSize: 20, fontWeight: 800 },
  kpiTitle: { fontSize: 12 },

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gap: 14,
    flex: 1,
    minHeight: 0,
  },

  panel: {
    background: "rgba(30,80,140,0.75)",
    borderRadius: 16,
    padding: 14,
    display: "flex",
    flexDirection: "column",
  },

  panelTitle: {
    fontSize: 13,
    marginBottom: 6,
  },

  chartWrapper: {
    flex: 1,
    minHeight: 0,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 12,
  },
};
