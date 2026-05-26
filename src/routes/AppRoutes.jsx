import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminLogin from "../pages/auth/AdminLogin";
import AdminRegister from "../pages/auth/AdminRegister";
import UserDashboard from "../pages/user/Dashboard";
import Products from "../pages/public/Products";
import Rates from "../pages/public/Rates";
import Workflow from "../pages/public/Workflow";
import Insights from "../pages/public/Insights";
import Legal from "../pages/public/Legal";
import Contact from "../pages/public/Contact";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminLoans from "../pages/admin/Loans";
import AdminReports from "../pages/admin/Reports";
import AdminSettings from "../pages/admin/Settings";
import Applications from "../pages/admin/Applications";
import Repayments from "../pages/admin/Repayments";
import Guarantors from "../pages/admin/Guarantors";
import Notifications from "../pages/admin/Notifications";
import Documents from "../pages/admin/Documents";
import Security from "../pages/admin/Security";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/products" element={<Products />} />
      <Route path="/rates" element={<Rates />} />
      <Route path="/workflow" element={<Workflow />} />
      <Route path="/insights" element={<Insights />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/applications" element={<ProtectedRoute requireAdmin><Applications /></ProtectedRoute>} />
      <Route path="/admin/loans" element={<ProtectedRoute requireAdmin><AdminLoans /></ProtectedRoute>} />
      <Route path="/admin/repayments" element={<ProtectedRoute requireAdmin><Repayments /></ProtectedRoute>} />
      <Route path="/admin/guarantors" element={<ProtectedRoute requireAdmin><Guarantors /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute requireAdmin><AdminReports /></ProtectedRoute>} />
      <Route path="/admin/notifications" element={<ProtectedRoute requireAdmin><Notifications /></ProtectedRoute>} />
      <Route path="/admin/documents" element={<ProtectedRoute requireAdmin><Documents /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>} />
      <Route path="/admin/security" element={<ProtectedRoute requireAdmin><Security /></ProtectedRoute>} />
    </Routes>
  );
}
