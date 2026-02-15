import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Exchange from "../pages/Exchange/Exchange";
import Profile from "../pages/Profile/Profile";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddBook from "../pages/AddBook/AddBook";
import MyBooks from "../pages/MyBooks/MyBooks";
import BookDetails from "../pages/BookDetails/BookDetails";
import EditBook from "../pages/EditBook/EditBook";
import Universities from "../pages/Universities/Universities";
import OwnerProfile from "../pages/OwnerProfile/OwnerProfile";
import Logout from "../pages/Auth/Logout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/book/:bookId" element={<BookDetails />} />
      <Route path="/owner/:userId" element={<OwnerProfile />} />
      <Route path="/universities" element={<Universities />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/add-book" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
      <Route path="/my-books" element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />
      <Route path="/book/:bookId/edit" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
      <Route path="/exchange" element={<ProtectedRoute><Exchange /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
