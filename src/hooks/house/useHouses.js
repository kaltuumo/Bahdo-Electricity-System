import { useState, useEffect } from "react";
import api from "../../api/api";
import { ApiConstants } from "../../api/ApiConstants";

export default function useHouses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all customers
  const fetchHouses = async () => {
    try {
      const res = await api.get(`${ApiConstants.houseEndpoint}/all-house`);
      if (res.data.success) setHouses(res.data.data);
    } catch (err) {
      console.log("Fetch Houses error:", err);
    }
  };

  // Delete customer
  const deleteHouse = async (id) => {
    if (!id) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    try {
      const res = await api.delete(`${ApiConstants.houseEndpoint}/delete-house/${id}`);
      if (res.data.success) {
        setHouses((prev) => prev.filter((h) => h._id !== id));
        alert("House deleted successfully ✔️");
      }
    } catch (err) {
      console.log("Delete error:", err);
      alert("Error deleting House");
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  return { houses, setHouses, loading, setLoading, fetchHouses, deleteHouse };
}
