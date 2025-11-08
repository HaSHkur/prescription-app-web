import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const data = [
    { date: "Nov 1", count: 5 },
    { date: "Nov 2", count: 8 },
    { date: "Nov 3", count: 3 },
    { date: "Nov 4", count: 10 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Daily Prescription Count</h2>
      <div className="bg-white p-4 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
