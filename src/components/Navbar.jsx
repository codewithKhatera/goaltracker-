import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Switch,
  InputBase,
  IconButton,
  Drawer
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import logo from "../assets/logo.png";

export default function Navbar({ dark, setDark, lang, setLang }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  // 🔥 ONLY ADDED ITEMS
  const pages = [
    { name: lang === "en" ? "Dashboard" : "داشبورد", path: "/dashboard" },
    { name: lang === "en" ? "Goals" : "اهداف", path: "/goals" },
    { name: lang === "en" ? "New Goal" : "هدف جدید", path: "/goals/new" },

    // ✅ ADDED
    { name: lang === "en" ? "Categories" : "دسته‌بندی‌ها", path: "/categories" },
    { name: lang === "en" ? "Settings" : "تنظیمات", path: "/settings" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 9999,
          width: "100%",
          px: 3,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(20px)",
          background: dark
            ? "rgba(15,23,42,0.7)"
            : "rgba(255,255,255,0.7)",
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}
        dir={lang === "fa" ? "rtl" : "ltr"}
      >

        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpenMenu(true)}
          >
            <MenuIcon />
          </IconButton>

          <Box component="img" src={logo}
            sx={{ width: 36, height: 36, borderRadius: 2 }}
          />

          <Typography fontWeight="bold" fontSize={18}>
            Goal Tracker
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, ml: 3 }}>
            {pages.map((p) => (
              <Box
                key={p.path}
                onClick={() => navigate(p.path)}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontSize: 14,
                  transition: "0.3s",
                  background: isActive(p.path)
                    ? "rgba(59,130,246,0.3)"
                    : "transparent",
                  "&:hover": {
                    background: "rgba(255,255,255,0.15)"
                  }
                }}
              >
                {p.name}
              </Box>
            ))}
          </Box>
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              px: 2,
              py: 0.5,
              borderRadius: "20px",
              background: "rgba(255,255,255,0.15)"
            }}
          >
            <SearchIcon fontSize="small" />
            <InputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === "en" ? "Search..." : "جستجو..."}
              sx={{ ml: 1, fontSize: 14, color: "inherit" }}
            />
          </Box>

          <Switch
            checked={dark}
            onChange={() => setDark(!dark)}
            size="small"
          />

          <Button onClick={() => setLang(lang === "en" ? "fa" : "en")}>
            {lang === "en" ? "FA" : "EN"}
          </Button>

          <Button onClick={() => navigate("/auth")}>
            {lang === "en" ? "Logout" : "خروج"}
          </Button>
        </Box>
      </Box>

      {/* MOBILE MENU */}
      <Drawer
        anchor={lang === "fa" ? "right" : "left"}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          {pages.map((p) => (
            <Box
              key={p.path}
              onClick={() => {
                navigate(p.path);
                setOpenMenu(false);
              }}
              sx={{
                py: 2,
                borderBottom: "1px solid #ddd",
                cursor: "pointer"
              }}
            >
              {p.name}
            </Box>
          ))}
        </Box>
      </Drawer>
    </>
  );
}