import { useState } from "react";

export default function useCustomerForm(initialValues = {}) {
  const [customerNo, setCustomerNo] = useState(initialValues.customerNo || "");
  const [fullname, setFullname] = useState(initialValues.fullname || "");
  const [phone, setPhone] = useState(initialValues.phone || "");
  const [city, setCity] = useState(initialValues.city || "");
  const [zoneName, setZoneName] = useState(initialValues.zoneName || "");
  const [areaName, setAreaName] = useState(initialValues.areaName || "");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setCustomerNo("");
    setFullname("");
    setPhone("");
    setCity("");
    setZoneName("");
    setAreaName("");
  };

  return {
    customerNo, setCustomerNo,
    fullname, setFullname,
    phone, setPhone,
    city, setCity,
    zoneName, setZoneName,
    areaName, setAreaName,
    loading, setLoading,
    resetForm
  };
}
