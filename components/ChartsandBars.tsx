"use client";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart() {
    const [chartData, setChartData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/expenses/get", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const expenses = res.data;
                console.log("EXPENSES:", expenses);
                const categoryMap: any = {};

                expenses.forEach((e: any) => {
                    if (!categoryMap[e.category]) {
                        categoryMap[e.category] = 0;
                    }
                    categoryMap[e.category] += e.amount;
                });

                setChartData({
                    labels: Object.keys(categoryMap),
                    datasets: [
                        {
                            label: "Expenses",
                            data: Object.values(categoryMap),
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4BC0C0",
                                "#9966FF",
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    if (!chartData) {
        return (
            <div className="text-center text-gray-400 text-sm">
                Loading chart...
            </div>
        );
    }

    return (
        <div >

            <div className="h-[240px] ">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
}