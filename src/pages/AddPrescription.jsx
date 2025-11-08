import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPrescription, getPrescriptionById } from "../services/api";

export default function AddPrescription() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    diagnosis: "",
    prescriptionDate: "",
    nextVisitDate: "",
    medicines: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch existing prescription if editing
  useEffect(() => {
    if (id) {
      const fetchPrescription = async () => {
        try {
          const data = await getPrescriptionById(id);
          setFormData({
            patientName: data.patientName || "",
            patientAge: data.patientAge || "",
            patientGender: data.patientGender || "",
            diagnosis: data.diagnosis || "",
            prescriptionDate: data.prescriptionDate?.split("T")[0] || "",
            nextVisitDate: data.nextVisitDate?.split("T")[0] || "",
            medicines: data.medicines || "",
          });
        } catch (err) {
          console.error("Error fetching prescription:", err);
        }
      };
      fetchPrescription();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        // PUT request for edit (you may need to define it)
        await addPrescription({ ...formData, id }); // or updatePrescription()
        alert("Prescription updated successfully!");
      } else {
        await addPrescription(formData);
        alert("Prescription added successfully!");
      }
      navigate("/prescriptions");
    } catch (err) {
      console.error("Error saving prescription:", err);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {id ? "Edit Prescription" : "Add New Prescription"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          placeholder="Patient Name"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="patientAge"
          value={formData.patientAge}
          onChange={handleChange}
          placeholder="Patient Age"
          type="number"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="patientGender"
          value={formData.patientGender}
          onChange={handleChange}
          placeholder="Patient Gender"
          className="w-full border rounded p-2"
        />
        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis"
          className="w-full border rounded p-2"
        />
        <input
          name="prescriptionDate"
          type="date"
          value={formData.prescriptionDate}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          name="nextVisitDate"
          type="date"
          value={formData.nextVisitDate}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <textarea
          name="medicines"
          value={formData.medicines}
          onChange={handleChange}
          placeholder="Medicines"
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : id ? "Update Prescription" : "Add Prescription"}
        </button>
      </form>
    </div>
  );
}
