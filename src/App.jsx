import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RegisterPage from "./components/RegisterPage";

import DashboardLayout from "./Dashboard/DashboardLayout";
import LoginPage from "./components/LoginPage";
import { getApps } from "./utils/helper";

function App() {

  const CurrentApp = getApps();

  return (
    <>
      <Router>
        <CurrentApp />
      </Router>
    </>
  );
}

export default App;
