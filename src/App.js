
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Detail from "./pages/detail.jsx";
import AddArticle from "./pages/add.jsx";
import UpdateArticle from "./pages/updateArticle.jsx";
import Layout from "./components/layout.jsx";
import Sign from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Nothing from "./components/nothing.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext);

  // Check if the user is logged in
  if (!auth) {
    return <Navigate to="/sign" />;
  }

  // Check if the user has the correct role (admin)
  if (role && auth.role !== role) {
    return <Navigate to="/" />; // Redirect to home if the role doesn't match
  }

  return children;
};

function App() {
  const { auth } = useContext(AuthContext);
  if (auth) {
    console.log('Utilisateur connecté:', auth);
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/article/:id" element={<Detail />} />
        <Route path="/article/addArticle" element={<AddArticle />} />
        <Route path="/updateArticle/:id" element={<UpdateArticle />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/sign" element={<Sign />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Nothing />} />
    </Routes>
  );
}

export default App;
