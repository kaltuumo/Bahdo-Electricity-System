import { useState, useEffect } from "react";

export default function useInvoiceForm(initialValues = {}) {
  const [fullname, setFullname] = useState(initialValues.fullname || "");
  const [phone, setPhone] = useState(initialValues.phone || "");
  const [zone, setZone] = useState(initialValues.zone || "");
  const [area, setArea] = useState(initialValues.area || "");
  const [beforeRead, setBeforeRead] = useState(initialValues.beforeRead || 0);
  const [afterRead, setAfterRead] = useState(initialValues.afterRead || 0);
  const [discount, setDiscount] = useState(initialValues.discount || 0);
  const [paid, setPaid] = useState(initialValues.paid || 0);
  const [month, setMonth] = useState(initialValues.month || "");
  const [status, setStatus] = useState(initialValues.status || "Unpaid");
  const [houseNo, setHouseNo] = useState(initialValues.houseNo || "");
  const [watchNo, setWatchNo] = useState(initialValues.watchNo || "");

  // Editable KWH
  const [kwhUsed, setKwhUsed] = useState(initialValues.kwhUsed || 0);
 
  // Calculated fields
  const [totalAmount, setTotalAmount] = useState(0);
  const [required, setRequired] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const [loading, setLoading] = useState(false);

  const UNIT_PRICE = 1;

  // Auto-calculate totals whenever kwhUsed, discount, or paid change
  useEffect(() => {
     const usedUnits = afterRead - beforeRead; // KWH used
    const total = Number((usedUnits * kwhUsed).toFixed(2)); // Total before discount
    const req = Number((total - discount).toFixed(2));       // Total after discount
    const rem = Number((req - paid).toFixed(2))

    setTotalAmount(total);
    setRequired(req);
    setRemaining(rem);
  }, [kwhUsed, discount, paid]);

  const resetForm = () => {
    setFullname("");
    setPhone("");
    setZone("");
    setArea("");
    setBeforeRead(0);
    setAfterRead(0);
    setDiscount(0);
    setPaid(0);
    setMonth("");
    setStatus("Unpaid");
    setHouseNo("");
    setWatchNo("");
    setKwhUsed(0);
    setTotalAmount(0);
    setRequired(0);
    setRemaining(0);
  };

  return {
    fullname, setFullname,
    phone, setPhone,
    zone, setZone,
    area, setArea,
    beforeRead, setBeforeRead,
    afterRead, setAfterRead,
    discount, setDiscount,
    paid, setPaid,
    month, setMonth,
    status, setStatus,
    houseNo, setHouseNo,
    watchNo, setWatchNo,
    kwhUsed, setKwhUsed,  // ✅ Important: export setKwhUsed
    totalAmount, required, remaining,
    loading, setLoading,
    resetForm
  };
}
