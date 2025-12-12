import React from "react";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaClock, FaUser } from "react-icons/fa";
import Card from "../../components/ui/Card";
import GenderBarChart from "./GenderBarChart";
import GenderPieChart from "./GenderPieChart";
import useInvoice from "../../hooks/invoice/useInvoice";
import { useAuth } from "../../context/AuthContext"; // ✅ Fixed import path

const Dashboard = () => {
  const { invoices } = useInvoice();
  const { user } = useAuth(); // ✅ Now used

  // Count totals
  const totalCustomers = invoices.length;
  const totalPaid = invoices.filter(i => i.status === "Paid").length;
  const totalUnpaid = invoices.filter(i => i.status === "Unpaid").length;
  const totalPending = invoices.filter(i => i.status === "Pending").length;

  const cards = [
    { icon: FaUsers, title: "Total Customers", value: totalCustomers, iconColor: "text-blue-500" },
    { icon: FaCheckCircle, title: "Paid", value: totalPaid, iconColor: "text-green-500" },
    { icon: FaTimesCircle, title: "Unpaid", value: totalUnpaid, iconColor: "text-red-500" },
    { icon: FaClock, title: "Pending", value: totalPending, iconColor: "text-yellow-500" },
  ];

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      {/* Assuming Sidebar is rendered elsewhere */}
      
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8 overflow-auto flex flex-col gap-6">
        {/* Header with Dashboard Title and User Info */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
{user && (
  <div className="flex items-center gap-3 px-3 py-2 rounded text-black w-max">
    {/* Rounded icon */}
    <div className="bg-gray-300 p-2 rounded-full flex items-center justify-center">
      <FaUser className="text-gray-700 w-5 h-5" />
    </div>

    {/* User info */}
    <div>
      <span className="font-medium">{user.userCode}</span>
      <span className="ml-1 text-gray-600">- {user.fullname}</span>
    </div>
  </div>
)}


        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid w-full grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded shadow">
            <GenderBarChart />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <GenderPieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
