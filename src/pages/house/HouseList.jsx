import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useHouses from "../../hooks/house/useHouses";
import useHouseForm from "../../hooks/house/useHouseForm";
import Button from "../../components/ui/Button";
import InputField from "../../components/ui/input";
import Label from "../../components/ui/Label";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

const CustomerList = () => {
  const navigate = useNavigate();
  const { houses, setHouses, deleteHouse } = useHouses();
  const {
     customerNo, setCustomerNo,
    fullname, setFullname,
    phone, setPhone,
    city, setCity,
    zoneName, setZoneName,
    areaName, setAreaName,
    loading, setLoading,
    resetForm
  } = useHouseForm();

  const [search, setSearch] = useState("");
 const filteredHouses = houses.filter(house =>
    house.fullname?.toLowerCase().includes(search.toLowerCase()) ||
    house.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5 text-white bg-[#2e6f7e] p-4 rounded-lg shadow-lg">
        House Management
      </h1>

      {/* Table */}
      <div className="mt-10 overflow-hidden rounded-xl shadow-lg border bg-white mt-8">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#2e6f7e] text-white">
            <tr>
              <th className="px-4 py-3 border">#</th>
              <th className="px-4 py-3 border">ID</th>
              <th className="px-4 py-3 border">Customer</th>
              <th className="px-4 py-3 border">Phone</th>
              <th className="px-4 py-3 border">House No</th>
              <th className="px-4 py-3 border">Watch No</th>
              <th className="px-4 py-3 border">Deegaan</th>
              <th className="px-4 py-3 border">Created</th>
              <th className="px-4 py-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredHouses.map((h, index) => (
              <tr key={h._id} className="hover:bg-gray-100">
                <td className="px-4 py-3 border">{index + 1}</td>
                <td className="px-4 py-3 border">{h.customerNo}</td>
                <td className="px-4 py-3 border">{h.fullname}</td>
                <td className="px-4 py-3 border">{h.phone}</td>
                <td className="px-4 py-3 border">{h.houseNo}</td>
                <td className="px-4 py-3 border">{h.watchNo}</td>
                <td className="px-4 py-3 border">{h.zoneName && h.areaName && h.city  ? `${h.city} - ${h.zoneName} - ${h.areaName} ` : "-"}</td>
                <td className="px-4 py-3 border">{h.createdDate && h.createdTime ? `${h.createdDate} ${h.createdTime}` : "-"}</td>
                <td className="px-4 py-3 border flex gap-3 text-xl">
                  <span className="cursor-pointer text-orange-600" onClick={() => navigate("/house-list", { state: { house: h } })}>🏠</span>
                  <span className="cursor-pointer text-orange-600" onClick={() => navigate("/customer-update", { state: { customer: h } })}>✏️</span>
                  <span className="cursor-pointer text-red-600" onClick={() => deleteHouse(h._id)}>🔑</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default CustomerList;
