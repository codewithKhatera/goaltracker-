import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppProvider";

export default function NotFound() {
  const navigate = useNavigate();
  const { lang, dark } = useApp();

  const t = {
    en: {
      title: "404",
      message: "Page Not Found",
      btn: "Go back home"
    },
    fa: {
      title: "۴۰۴",
      message: "صفحه پیدا نشد",
      btn: "برگشت به خانه"
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        background: dark ? "#0f172a" : "#f8fafc",
        color: dark ? "white" : "#0f172a",
        transition: "0.3s"
      }}
    >
      {/* BIG NUMBER */}
      <Typography
        fontSize={90}
        fontWeight="bold"
        sx={{
          textShadow: dark
            ? "0 0 30px rgba(59,130,246,0.5)"
            : "0 0 20px rgba(0,0,0,0.1)"
        }}
      >
        {t[lang].title}
      </Typography>

      {/* MESSAGE */}
      <Typography fontSize={22} mt={1} mb={3}>
        {t[lang].message}
      </Typography>

      {/* BUTTON */}
      <Button
        variant="contained"
        onClick={() => navigate("/dashboard")}
        sx={{
          px: 4,
          py: 1,
          borderRadius: "20px",
          boxShadow: "0 0 20px rgba(59,130,246,0.4)",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 0 30px rgba(59,130,246,0.6)"
          }
        }}
      >
        {t[lang].btn}
      </Button>
    </Box>
  );
}