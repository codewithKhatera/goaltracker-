import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import SplashScreen from "./pages/SplashScreen";
import Auth from "./pages/Auth";
import Goals from "./pages/Goals";
import NewGoal from "./pages/NewGoal";
import Categories from "./pages/Categories"; // ✅ ADDED
import Settings from "./pages/Settings"; // ✅ ADDED
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { AppProvider, useApp } from "./context/AppProvider";

function AppContent() {
  const location = useLocation();
  const { lang, setLang, dark, setDark } = useApp();

  const hideNavbar =
    location.pathname === "/" || location.pathname === "/auth";

  return (
    <div
      style={{
        background: dark ? "#0f172a" : "#f8fafc",
        color: dark ? "white" : "#0f172a",
        minHeight: "100vh",
        transition: "0.4s ease"
      }}
      dir={lang === "fa" ? "rtl" : "ltr"}
    >
      {!hideNavbar && (
        <Navbar
          lang={lang}
          setLang={setLang}
          dark={dark}
          setDark={setDark}
        />
      )}

      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/goals/new" element={<NewGoal />} />
        <Route path="/goals/:id" element={<NewGoal />} />
        <Route path="*" element={<NotFound />} />
        {/* 🔥 ADDED PAGES */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}