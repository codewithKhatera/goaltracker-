import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import logo from "../assets/logo.png";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/Auth"), 2500);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        background: "#14366D",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        fontFamily: "Georgia, serif",
        padding: 2
      }}
    >
      {/* 🔥 BIG LOGO */}
      <img
        src={logo}
        alt="logo"
        style={{
          width: 200,      // 👈 اینو بزرگ کردم
          height: 200,
          objectFit: "contain",
          marginBottom: 20
        }}
      />

      {/* TITLE */}
      <Typography variant="h3" fontWeight="bold">
        GOAL TRACKER
      </Typography>

      {/* DESCRIPTION */}
      <Typography mt={2} sx={{ maxWidth: 450, opacity: 0.9 }}>
        Build your goals, track your progress, and become the best version of yourself.
      </Typography>

      {/* LOADING BAR */}
      <Box
        sx={{
          width: 300,
          height: 6,
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: 10,
          mt: 4,
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "white",
            transition: "0.2s"
          }}
        />
      </Box>

      {/* LOADING TEXT */}
      <Typography mt={2} fontSize={14}>
        PREPARING YOUR DASHBOARD... {progress}%
      </Typography>
    </Box>
  );
}