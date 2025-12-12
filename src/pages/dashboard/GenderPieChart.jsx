// src/pages/dashboard/StatusPieChart.jsx
import React, { useEffect, useState, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const StatusPieChart = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await api.get(`${ApiConstants.invoiceEndpoint}/all-invoice`);
      if (res.data.success) setInvoices(res.data.data);
    } catch (err) {
      console.log("Error fetching invoices:", err);
    }
  };

  // Count Paid, Pending, Unpaid
  const statusData = useMemo(() => {
    if (!invoices || invoices.length === 0) return [
      { name: "Paid", value: 0 },
      { name: "Pending", value: 0 },
      { name: "Unpaid", value: 0 },
    ];

    let paid = 0;
    let pending = 0;
    let unpaid = 0;

    invoices.forEach((inv) => {
      if (inv.status === "Paid") paid++;
      else if (inv.status === "Pending") pending++;
      else unpaid++;
    });

    return [
      { name: "Paid", value: paid },
      { name: "Pending", value: pending },
      { name: "Unpaid", value: unpaid },
    ];
  }, [invoices]);

  const COLORS = ["#00C49F", "#FFBB28", "#FF4444"]; // Green, Yellow, Red

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={statusData}
          dataKey="value"
          nameKey="name"  // ✅ ensure labels show Paid, Pending, Unpaid
          cx="50%"
          cy="50%"
          outerRadius={85}
          label={({ name, value }) => `${name}: ${value}`} // show name and value on chart
        >
          {statusData.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusPieChart;
