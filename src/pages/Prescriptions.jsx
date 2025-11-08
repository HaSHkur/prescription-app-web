import { useEffect, useState } from "react";
import { getPrescriptions } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import {logout} from "../context/AuthContext";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPrescriptions();
      setPrescriptions(data.content || []);
    };
    fetchData();
  }, []);

  const hangleLogout = () => {
    // e.preventDefault();
    logout();
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Prescriptions</h2>
        <div className="space-x-2">
          <button onClick={() => navigate("/dashboard")} className="bg-blue-500 text-white px-3 py-1 rounded">Dashboard</button>
          <button onClick={() => navigate("/prescriptions/new")} className="bg-green-500 text-white px-3 py-1 rounded">Add Prescription</button>
          <button onClick={() => navigate("/medicines")} className="bg-red-500 text-white px-3 py-1 rounded">Medicines</button>
          <button onClick={hangleLogout} className="bg-orange-500 text-white px-3 py-1 rounded">Log Out</button>
        </div>
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
