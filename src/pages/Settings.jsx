import { Box, Typography, Button, Snackbar } from "@mui/material";
import { useApp } from "../context/AppProvider";
import { useEffect, useState } from "react";

export default function Settings() {
  const { lang, setLang, dark, setDark } = useApp();

  const [saved, setSaved] = useState(false);

  const t = {
    en: {
      title: "Settings",
      language: "Language",
      theme: "Theme",
      switchLang: "Switch Language",
      toggleTheme: "Toggle Dark Mode",
      saved: "Settings saved successfully"
    },
    fa: {
      title: "تنظیمات",
      language: "زبان",
      theme: "حالت نمایش",
      switchLang: "تغییر زبان",
      toggleTheme: "تغییر حالت تاریک",
      saved: "تنظیمات با موفقیت ذخیره شد"
    }
  };

  /* 🔥 BONUS 1: LOAD FROM LOCALSTORAGE */
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    const savedDark = localStorage.getItem("dark");

    if (savedLang) setLang(savedLang);
    if (savedDark !== null) setDark(savedDark === "true");
  }, []);

  /* 🔥 BONUS 2: SAVE AUTOMATICALLY */
  const updateLang = () => {
    const newLang = lang === "en" ? "fa" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    setSaved(true);
  };

  const updateTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    localStorage.setItem("dark", newDark);
    setSaved(true);
  };

  return (
    <Box
      p={3}
      dir={lang === "fa" ? "rtl" : "ltr"}
      sx={{
        minHeight: "100vh",
        background: dark
          ? "linear-gradient(135deg,#0b1220,#0f172a,#111827)"
          : "#f6f7fb",
        color: dark ? "#e5e7eb" : "#0f172a"
      }}
    >
      <Typography fontSize={26} fontWeight="bold" mb={3}>
        ⚙️ {t[lang].title}
      </Typography>

      {/* LANGUAGE */}
      <Box sx={card(dark)}>
        <Typography mb={2}>🌐 {t[lang].language}</Typography>

        <Button onClick={updateLang} sx={btn}>
          {t[lang].switchLang} ({lang})
        </Button>
      </Box>

      {/* THEME */}
      <Box sx={card(dark)}>
        <Typography mb={2}>🎨 {t[lang].theme}</Typography>

        <Button onClick={updateTheme} sx={btn}>
          {t[lang].toggleTheme}
        </Button>
      </Box>

      {/* 🔥 BONUS FEEDBACK */}
      <Snackbar
        open={saved}
        autoHideDuration={2000}
        onClose={() => setSaved(false)}
        message={t[lang].saved}
      />
    </Box>
  );
}

/* ================= STYLES ================= */

const card = (dark) => ({
  p: 3,
  borderRadius: 3,
  mb: 2,
  background: dark
    ? "rgba(255,255,255,0.04)"
    : "#ffffff",
  border: dark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(99,102,241,0.15)",
  boxShadow: dark
    ? "0 12px 30px rgba(0,0,0,0.4)"
    : "0 10px 25px rgba(99,102,241,0.12)"
});

const btn = {
  mt: 1,
  px: 3,
  py: 1,
  borderRadius: 2,
  textTransform: "none",
  fontWeight: "bold",
  background: "linear-gradient(90deg,#6366f1,#10b981)",
  color: "white",
  "&:hover": {
    opacity: 0.9,
    transform: "scale(1.03)"
  }
};