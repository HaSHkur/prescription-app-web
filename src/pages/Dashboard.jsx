import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getPrescriptionCounts, getPrescriptionCountByDate } from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    date: "",
    count: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPrescriptionCounts();
      setData(res || []);
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetCount = async (e) => {
    e.preventDefault();
    try {
      const res = await getPrescriptionCountByDate(formData.date);
      setFormData((prev) => ({ ...prev, count: res?.count ?? "0" }));
    } catch (err) {
      console.error("Error fetching count:", err);
      setFormData((prev) => ({ ...prev, count: "0" }));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Daily Prescription Count</h1>
      <form onSubmit={handleGetCount} className="space-y-4">
        
        <h3 className="text-2xl font-semibold mb-6">Get count by Date</h3>
        <div className="flex items-center gap-3">
          <div className="space-y-1">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Prescription Date
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`w-full border rounded p-2`}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-5">Get Count</button>
          <div className="flex-1">
            <label htmlFor="count" className="block text-sm font-medium text-gray-700">Count</label>
            <input
              id="count"
              name="count"
              type="text"
              value={formData.count}
              disabled
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>
        </div>
      </form>
      <div className="bg-white p-4 rounded-xl shadow mt-10">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
