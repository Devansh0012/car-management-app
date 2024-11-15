import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";
import CreateCarPage from "./pages/CreateCarPage";
import EditCarPage from "./pages/EditCarPage";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cars" element={<ProtectedRoute><CarListPage /></ProtectedRoute>} />
          <Route path="/cars/create" element={<ProtectedRoute><CreateCarPage /></ProtectedRoute>} />
          <Route path="/cars/:id" element={<ProtectedRoute><CarDetailPage /></ProtectedRoute>} />
          <Route path="/cars/:id/edit" element={<ProtectedRoute><EditCarPage /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// ProtectedRoute component to handle authentication
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default App;
