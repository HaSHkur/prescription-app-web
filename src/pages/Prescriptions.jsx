import { useEffect, useState } from "react";
import { getPrescriptions } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import {logout} from "../context/AuthContext";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchParams, setSearchParams] = useState({
    fromDate: "",
    toDate: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const fetchPrescriptions = async (params = {}) => {
    try {
      // Only include non-empty date params and ensure they're in ISO format (YYYY-MM-DD)
      const searchParams = {};
      if (params.fromDate) {
        searchParams.fromDate = params.fromDate;  // HTML date input already uses YYYY-MM-DD
      }
      if (params.toDate) {
        searchParams.toDate = params.toDate;      // HTML date input already uses YYYY-MM-DD
      }
      
      const data = await getPrescriptions(searchParams);
      setPrescriptions(data.content || []);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
      setError("Failed to fetch prescriptions");
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const hangleLogout = () => {
    // e.preventDefault();
    logout();
  }

  return (
    <div className="p-6">
            <div className="space-y-4 mb-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Prescriptions</h2>
          
          <div className="space-x-2">
            <button onClick={() => navigate("/dashboard")} className="bg-blue-500 text-white px-3 py-1 rounded">Dashboard</button>
            <button onClick={() => navigate("/prescriptions/new")} className="bg-green-500 text-white px-3 py-1 rounded">Add Prescription</button>
            <button onClick={() => navigate("/medicines")} className="bg-red-500 text-white px-3 py-1 rounded">Medicines</button>
            <button onClick={hangleLogout} className="bg-orange-500 text-white px-3 py-1 rounded">Log Out</button>
          </div>
        </div>

        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              id="fromDate"
              type="date"
              value={searchParams.fromDate}
              onChange={(e) => {
                setSearchParams(prev => ({ ...prev, fromDate: e.target.value }));
                setError("");
              }}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              id="toDate"
              type="date"
              value={searchParams.toDate}
              onChange={(e) => {
                setSearchParams(prev => ({ ...prev, toDate: e.target.value }));
                setError("");
              }}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                if (searchParams.fromDate && searchParams.toDate && searchParams.toDate < searchParams.fromDate) {
                  setError("To Date must be after From Date");
                  return;
                }
                fetchPrescriptions(searchParams);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
            <button
              onClick={() => {
                setSearchParams({ fromDate: "", toDate: "" });
                setError("");
                fetchPrescriptions();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Patient</th>
            <th className="px-4 py-2 text-left">Age</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(prescriptions) &&
            prescriptions.map((p) => (
              <tr
                key={p.id}
                onClick={() => navigate(`/prescriptions/${p.id}`)}
                className="border-t cursor-pointer hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{p.id}</td>
                <td className="px-4 py-2">{new Date(p.prescriptionDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                })}</td>
                <td className="px-4 py-2">{p.patientName}</td>
                <td className="px-4 py-2">{p.patientAge}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
