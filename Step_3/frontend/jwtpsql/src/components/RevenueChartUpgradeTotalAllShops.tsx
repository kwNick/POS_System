import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

import type { ChartOptions } from "chart.js";
import { SalesSummaryModel } from "@/lib/models/SalesSummary";
import { useAuth } from "@/context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

type Period = "1M" | "3M" | "6M" | "1Y" | "ALL";
type GroupedSales = Record<string, SalesSummaryModel[]>;

const RevenueChartUpgradeTotalAllShops = ({userId}:{userId: number | null}) => {
  const { fetchSalesSummaryTotalAllShopsAndPeriod } = useAuth();
  const [period, setPeriod] = useState<Period>("1M");
  const [groupedSales, setGroupedSales] = useState<GroupedSales>({});
  // const [salesPoints, setSalesPoints] = useState<SalesSummaryModel[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    const controller = new AbortController();

    const fetchChartAnalytics = async () => {
      try {
        setLoading(true);
        if(userId === null){ return;}
        const response = await fetchSalesSummaryTotalAllShopsAndPeriod(userId.toString(), period);

        if (!response) {
          throw new Error("Failed to fetch chart analytics"+response);
        }

        // const result: SalesSummaryModel[] = await response.json();

        const grouped = response.reduce((groups, point) => {
          if (!groups[point.seriesKey]) {
              groups[point.seriesKey] = [];
          }

          groups[point.seriesKey].push(point);

          return groups;
        }, {} as Record<string, SalesSummaryModel[]>);

        Object.values(grouped).forEach((points) => {
          points.sort((a, b) => a.pointNumber - b.pointNumber);
        });

        if (isCurrent) {
          setGroupedSales(grouped);
        }

        // setSalesPoints(response);
      } catch (error) {
        if (isCurrent) {
          console.error(error);
          setGroupedSales({});
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchChartAnalytics();

    return () => {controller.abort(); isCurrent = false;}
  }, [ userId, period]);

  const currency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

    // Every series uses the same date buckets.
  const firstSeries = Object.values(groupedSales)[0] ?? [];

  const labels = firstSeries.map((point) => point.date);

    const colors = [
    "rgb(59, 130, 246)",
    "rgb(239, 68, 68)",
    "rgb(16, 185, 129)",
    "rgb(245, 158, 11)",
    "rgb(139, 92, 246)",
    "rgb(236, 72, 153)",
  ];

  const data = {
    labels,

    datasets: Object.entries(groupedSales).map(
      ([seriesKey, points], index) => ({
        label: points[0]?.seriesName ?? seriesKey,
        data: points.map((point) => point.totalRevenue),

        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],

        fill: false,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 7,
      })
    ),
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          color: "#374151",
          usePointStyle: true,
          pointStyle: "line",
          padding: 15,
          font: {
            size: 14,
          },
        },
      },

      // Gonna need to make an external tooltip to change the width and height
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,

        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,

        padding: 16,
        cornerRadius: 10,
        caretPadding: 10,

        titleFont: {
          size: 14,
          weight: "bold",
        },

        bodyFont: {
          size: 12,
        },

        bodySpacing: 6,

        displayColors: false,

        callbacks: {
          label: () => [],

          afterBody: (items) => {
            const tooltipLines: string[] = [];

            items.forEach((item) => {
              const seriesKey = Object.keys(groupedSales)[
                item.datasetIndex
              ];

              const point = groupedSales[seriesKey]?.[item.dataIndex];

              if (!point) return;

              tooltipLines.push(
                `--- ${point.seriesName} ---`,
                `Revenue: ${currency(point.totalRevenue)}`,
                `Transactions: ${point.totalTransactions}`,
                `Average sale: ${currency(point.averageSale)}`,
                `Total tax: ${currency(point.totalTax)}`,
                `Average tax: ${currency(point.avgTaxPerSale)}`,
                `Units sold: ${point.unitsSold}`,
                "",
                "Employee performance:"
              );

              tooltipLines.push(
                ...(point.employeeSalesSummary ?? []).map(
                  (employee) =>
                    `${employee.employeeName}: ${currency(employee.totalRevenue)} (${employee.totalTransactions} sales)`
                ),
                ""
              );
            });

            return tooltipLines;
          },
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => currency(Number(value)),
        },
      },
    },
  };

  console.log("groupedSales: ", groupedSales);
  return (
    <div className="h-[100%] w-[100%] rounded-xl border bg-white p-5 shadow-sm">

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">
            Revenue Over Time
          </h2>
          <p className="text-sm text-gray-500">
            Revenue and sales performance
          </p>
        </div>

        <div className="flex gap-2">
          {(["1M", "3M", "6M", "1Y", "ALL"] as Period[]).map(
            (option) => (
              <button
                key={option}
                onClick={() => setPeriod(option)}
                className={`rounded-md px-3 py-2 text-sm ${
                  period === option
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {option}
              </button>
            )
          )}
        </div>
      </div>

      <div className="relative h-[600px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            Loading analytics...
          </div>
        ) : (
          <Line data={data} options={options} className=""/>
        )}
      </div>
    </div>
  );
};
export default RevenueChartUpgradeTotalAllShops