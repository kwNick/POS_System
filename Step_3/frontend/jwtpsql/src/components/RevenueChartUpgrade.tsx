"use client";

import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
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
  Filler
);

type Period = "1M" | "3M" | "6M" | "1Y" | "ALL";

const RevenueChartUpgrade = ({ shopId }: { shopId: number }) => {
  const { fetchSalesSummaryByShopIdAndPeriod } = useAuth();
  const [period, setPeriod] = useState<Period>("1M");
  const [salesPoints, setSalesPoints] = useState<SalesSummaryModel[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchChartAnalytics = async () => {
      try {
        setLoading(true);

        const response = await fetchSalesSummaryByShopIdAndPeriod(shopId.toString(), period);

        if (!response) {
          throw new Error("Failed to fetch chart analytics"+response);
        }

        // const result: SalesSummaryModel[] = await response.json();

        setSalesPoints(response);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchChartAnalytics();

    return () => controller.abort();
  }, [shopId, period]);

  const currency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  const data = {
    labels: salesPoints?.map((point) => point.date),

    datasets: [
      {
        label: "Revenue",
        data: salesPoints?.map((point) => point.totalRevenue),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.12)",
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 7,
      },
    ],
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
        display: false,
      },

      tooltip: {
        callbacks: {
          label: () => "",

          afterBody: (items) => {
            const index = items[0]?.dataIndex;

            if (index === undefined) return [];

            const point = salesPoints?.[index];

            if (!point) return [];

            return [
              `Revenue: ${currency(point.totalRevenue)}`,
              `Transactions: ${point.totalTransactions}`,
              `Average sale: ${currency(point.averageSale)}`,
              `Total tax: ${currency(point.totalTax)}`,
              `Average tax: ${currency(point.avgTaxPerSale)}`,
              `Units sold: ${point.unitsSold}`,
              "",
              "Employee performance:",
              ...point.employeeSalesSummary.map(
                (employee) =>
                  `${employee.employeeName}: ${currency(employee.totalRevenue)} (${employee.totalTransactions} sales)`
              ),
            ];
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

      <div className="relative">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            Loading analytics...
          </div>
        ) : (
          <Line data={data} options={options} className="w-[90%] h-[90%]"/>
        )}
      </div>
    </div>
  );
};

export default RevenueChartUpgrade;
