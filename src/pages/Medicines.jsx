export default function Medicines() {
  const medicines = [
    { name: "Paracetamol", type: "Tablet", dose: "500mg" },
    { name: "Amoxicillin", type: "Capsule", dose: "250mg" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Medicines List</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Name</th><th>Type</th><th>Dose</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m, idx) => (
            <tr key={idx} className="border-t text-center">
              <td>{m.name}</td>
              <td>{m.type}</td>
              <td>{m.dose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
