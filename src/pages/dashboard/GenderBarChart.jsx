// GenderBarChart.jsx
import { useEffect, useState } from "react";
import api from "../../api/api"; // haddii aad leedahay api instance
import { ApiConstants } from "../../api/ApiConstants";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const GenderBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCustomerGender();
  }, []);

  const fetchCustomerGender = async () => {
    try {
      const res = await api.get(`${ApiConstants.customerEndpoint}/all-customer`);
      if (!res.data.success) return;

      const customers = res.data.data || [];

      // Count by gender
      const maleCount = customers.filter((c) => c.gender === "Male").length;
      const femaleCount = customers.filter((c) => c.gender === "Female").length;

      setData([
        { gender: "Male", value: maleCount },
        { gender: "Female", value: femaleCount },
      ]);
    } catch (err) {
      console.error("Error fetching customers:", err);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="gender" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#2e6f7e" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GenderBarChart;
