import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Prescriptions from "./pages/Prescriptions";
import AddPrescription from "./pages/AddPrescription";
import Medicines from "./pages/Medicines";
import PrescriptionDetails from "./pages/PrescriptionDetails";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            localStorage.getItem("token") ? 
              <Navigate to="/prescriptions" replace /> : 
              <Navigate to="/login" replace />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/prescriptions" element={<ProtectedRoute><Prescriptions /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/prescriptions/new" element={<ProtectedRoute><AddPrescription /></ProtectedRoute>} />
          <Route path="/prescriptions/edit/:id" element={<ProtectedRoute><AddPrescription /></ProtectedRoute>}/>
          <Route path="/medicines" element={<ProtectedRoute><Medicines /></ProtectedRoute>} />
          <Route path="/prescriptions/:id" element={<ProtectedRoute><PrescriptionDetails /></ProtectedRoute>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
