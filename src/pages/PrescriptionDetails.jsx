import { useEffect, useState } from "react";
import { useParams, Link , useNavigate} from "react-router-dom";
import { getPrescriptionById, deletePrescription } from "../services/api";

export default function PrescriptionDetails() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPrescriptionById(id);
        setPrescription(data);
      } catch (err) {
        console.error("Error fetching prescription details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this prescription?")) return;
    try {
      await deletePrescription(id);
      navigate("/prescriptions");
    } catch (err) {
      alert("Failed to delete prescription.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!prescription) return <div className="text-center mt-10 text-red-600">Prescription not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Prescription Details</h2>

      <div className="space-y-3 text-gray-700">
        <p><strong>ID:</strong> {prescription.id}</p>
        <p><strong>Patient Name:</strong> {prescription.patientName}</p>
        <p><strong>Age:</strong> {prescription.patientAge}</p>
        <p><strong>Gender:</strong> {prescription.patientGender}</p>
        <p><strong>Prescription Date:</strong> 
        {new Date(prescription.prescriptionDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })}
        </p>

        <p><strong>Next Visit Date:</strong> 
        {new Date(prescription.nextVisitDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })}
        </p>
        <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>
        {prescription.medicines && (
          <div>
            <strong>Medicines:</strong>
            <ul className="list-disc ml-6">
              {prescription.medicines.split("\n").map((med, idx) => (
                <li key={idx}>{med}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Link
            to="/prescriptions"
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
            Back to List
        </Link>

        <Link
            to={`/prescriptions/edit/${prescription.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Edit Prescription
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
        
      </div>
      
    </div>
  );
}
