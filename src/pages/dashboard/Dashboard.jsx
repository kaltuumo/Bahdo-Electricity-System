import React from "react";
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import Card from "../../components/ui/Card";
import GenderBarChart from "../dashboard/GenderBarChart";
import GenderPieChart from "../dashboard/GenderPieChart";
const Dashboard = () => {
  const cards = [
    {
      icon: FaUsers,
      title: "Total Customer",
      value: 75,
      iconColor: "text-blue-500",
    },
    {
      icon: FaBox,
      title: "Total Rest",
      value: 75,
      iconColor: "text-green-500",
    },
    {
      icon: FaShoppingCart,
      title: "New Orders",
      value: 50,
      iconColor: "text-yellow-500",
    },
    {
      icon: FaDollarSign,
      title: "Revenue",
      value: "$1200",
      iconColor: "text-red-500",
    },
  ];

  return (
  <div className="flex h-screen">
  <div className="flex-1 bg-gray-100 p-8 overflow-auto flex flex-col gap-6">
    <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>

    {/* Cards */}
    <div className="grid grid-cols-4 gap-3 mb-8">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>

   <div className="grid w-full grid-cols-2 gap-8">
  {/* Bar Chart */}
  <div className="bg-white p-4 rounded shadow">
    <GenderBarChart />
  </div>

  {/* Pie Chart */}
  <div className="bg-white p-4 rounded shadow">
    <GenderPieChart />
  </div>
</div>



  </div>
</div>

    
  );
};

export default Dashboard;
