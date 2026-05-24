import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Roadmap from "./pages/Roadmap";
import Jobs from "./pages/Jobs";
import Resources from "./pages/Resources";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
        <Route path="/roadmap" element={<PrivateRoute><Roadmap /></PrivateRoute>} />
        <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/resources" element={<PrivateRoute><Resources /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/career" element={<Navigate to="/onboarding" />} />
      </Routes>
      <Footer />
    </>

  );
}