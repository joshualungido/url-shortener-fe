import AboutPage from "./components/AboutPage";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import DashboardLayout from "./Dashboard/DashboardLayout";
import ShortenUrlPage from "./Dashboard/ShortenUrlPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";
const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/register"
          element={
            <PrivateRoute publicPage={true}>
              <RegisterPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute publicPage={true}>
              <LoginPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute publicPage={false}>
              <DashboardLayout />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage message="We can't seem to find the page you're looking for." />} />
        <Route path="/error" element={<ErrorPage message="Error" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;

export const subDomainRouter = () => {
  return (
    <Routes>
      <Route path="/:url" element={<ShortenUrlPage />} />
    </Routes>
  );
};
