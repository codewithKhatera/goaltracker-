import { Box, Typography, Button } from "@mui/material";
import { useApp } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import FlagIcon from "@mui/icons-material/Flag";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function Dashboard() {
  const { goals, addProgress, xp, lang, streak, dark } = useApp();
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const active = goals.filter((g) => g.status === "active");
  const completed = goals.filter((g) => g.status === "completed");

  const t = {
    fa: {
      dashboard: "داشبورد",
      welcome: "خوش برگشتی 🌿",
      subtitle: "مسیرت رو دنبال کن و هر روز قوی‌تر شو",
      quick: "اکشن‌های سریع",
      newGoal: "+ هدف جدید",
      viewGoals: "دیدن همه اهداف",
      active: "اهداف فعال",
      completed: "تکمیل شده",
      streak: "استریک",
      xp: "XP",
      progress: "+ پیشرفت",
      completedGoals: "اهداف تکمیل شده",
      time: "زمان زنده"
    },
    en: {
      dashboard: "Dashboard",
      welcome: "Welcome back 🌿",
      subtitle: "Keep tracking your journey and grow stronger every day",
      quick: "Quick Actions",
      newGoal: "+ New Goal",
      viewGoals: "View All Goals",
      active: "Active Goals",
      completed: "Completed",
      streak: "Streak",
      xp: "XP",
      progress: "+ Progress",
      completedGoals: "Completed Goals",
      time: "Live Time"
    }
  };

  const text = t[lang || "en"];

  return (
    <Box
      p={3}
      dir={lang === "fa" ? "rtl" : "ltr"}
      sx={{
        background: dark ? "#0b1220" : "#f4f6fb",
        color: dark ? "#e5e7eb" : "#0f172a",
        minHeight: "100vh",
        transition: "0.3s"
      }}
    >

      {/* HEADER */}
      <Box sx={heroCard(dark)}>
        <Typography fontSize={42} fontWeight="bold">
          {text.dashboard}
        </Typography>

        <Typography mt={1} fontSize={18}>
          {text.welcome}
        </Typography>

        <Typography mt={1} fontSize={13} sx={{ opacity: 0.8 }}>
          {text.subtitle}
        </Typography>

        <Box sx={clockCard(dark)}>
          <Typography fontSize={14} sx={{ opacity: 0.7 }}>
            {text.time}
          </Typography>
          <Typography fontSize={24} fontWeight="bold">
            {time.toLocaleTimeString()}
          </Typography>
        </Box>
      </Box>

      {/* QUICK ACTIONS */}
      <Box sx={quickCard(dark)}>
        <Typography mb={1}>{text.quick}</Typography>

        <Button
          variant="contained"
          startIcon={<RocketLaunchIcon />}
          sx={btnGlow}
          onClick={() => navigate("/goals/new")}
        >
          {text.newGoal}
        </Button>

        <Button
          variant="outlined"
          sx={btnOutlineGlow}
          onClick={() => navigate("/goals")}
        >
          {text.viewGoals}
        </Button>
      </Box>

      {/* STATS */}
      <Box sx={grid}>
        <Stat title={text.active} value={active.length} icon={<FlagIcon />} dark={dark} />
        <Stat title={text.completed} value={completed.length} icon={<CheckCircleIcon />} dark={dark} />
        <Stat title={text.streak} value={streak} icon={<TrendingUpIcon />} dark={dark} />
        <Stat title={text.xp} value={xp} icon={<BoltIcon />} dark={dark} />
      </Box>

      {/* ACTIVE */}
      <Box sx={card(dark)}>
        <Typography fontSize={18} mb={2}>
          {text.active}
        </Typography>

        {active.map((g) => {
          const percent = g.target ? (g.progress / g.target) * 100 : 0;

          return (
            <Box key={g.id} sx={goalCard(g.color, dark)}>

              <Typography fontWeight="bold">{g.title}</Typography>

              <Typography fontSize={12} sx={{ opacity: 0.75 }}>
                {g.progress} / {g.target}
              </Typography>

              <Box sx={bar(dark)}>
                <Box
                  sx={{
                    width: `${percent}%`,
                    height: "100%",
                    background: "linear-gradient(90deg,#7c3aed,#22c55e)",
                    borderRadius: 10,
                    transition: "0.6s ease"
                  }}
                />
              </Box>

              <Button
                size="small"
                onClick={() => addProgress(g.id)}
                sx={{ mt: 1 }}
              >
                {text.progress}
              </Button>

            </Box>
          );
        })}
      </Box>

      {/* COMPLETED */}
      <Box sx={card(dark)}>
        <Typography fontSize={18} mb={2}>
          {text.completedGoals}
        </Typography>

        {completed.map((g) => (
          <Typography key={g.id}>
            ✅ {g.title}
          </Typography>
        ))}
      </Box>

    </Box>
  );
}

/* ================= STYLES ================= */

const heroCard = (dark) => ({
  p: 3,
  borderRadius: 3,
  mb: 3,
  background: dark
    ? "linear-gradient(135deg,#111827,#0b1220)"
    : "#ffffff",
  border: "1px solid rgba(124,58,237,0.25)",
  boxShadow: dark
    ? "0 25px 60px rgba(0,0,0,0.5)"
    : "0 15px 40px rgba(124,58,237,0.15)",
  transition: "0.4s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 30px 70px rgba(124,58,237,0.3)"
  }
});

const clockCard = (dark) => ({
  mt: 2,
  p: 2,
  borderRadius: 2,
  background: dark ? "rgba(255,255,255,0.04)" : "#eef2ff",
  boxShadow: "0 10px 25px rgba(124,58,237,0.2)",
  width: "fit-content"
});

const quickCard = (dark) => ({
  p: 3,
  mb: 3,
  borderRadius: 2,
  background: dark ? "rgba(255,255,255,0.03)" : "#ffffff",
  border: "1px solid rgba(124,58,237,0.2)",
  boxShadow: "0 15px 35px rgba(124,58,237,0.12)",
  transition: "0.4s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 25px 60px rgba(124,58,237,0.25)"
  }
});

const btnGlow = {
  mr: 2,
  background: "linear-gradient(90deg,#7c3aed,#3b82f6)",
  boxShadow: "0 10px 25px rgba(124,58,237,0.3)",
  "&:hover": {
    transform: "scale(1.06)",
    boxShadow: "0 20px 40px rgba(124,58,237,0.5)"
  }
};

const btnOutlineGlow = {
  borderColor: "#7c3aed",
  color: "#7c3aed",
  "&:hover": {
    background: "rgba(124,58,237,0.1)",
    transform: "scale(1.05)"
  }
};

const grid = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2,1fr)",
    md: "repeat(4,1fr)"
  },
  gap: 2,
  mb: 3
};

function Stat({ title, value, icon, dark }) {
  return (
    <Box sx={{
      p: 2,
      borderRadius: 2,
      background: dark ? "rgba(255,255,255,0.03)" : "#ffffff",
      border: "1px solid rgba(124,58,237,0.2)",
      boxShadow: "0 15px 35px rgba(124,58,237,0.15)",
      transition: "0.4s",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 25px 50px rgba(124,58,237,0.3)"
      }
    }}>
      <Box display="flex" alignItems="center" gap={1}>
        {icon}
        <Typography fontSize={14}>{title}</Typography>
      </Box>

      <Typography fontSize={22} fontWeight="bold">
        {value}
      </Typography>
    </Box>
  );
}

const card = (dark) => ({
  p: 3,
  borderRadius: 2,
  mb: 3,
  background: dark ? "rgba(255,255,255,0.03)" : "#ffffff",
  border: "1px solid rgba(124,58,237,0.2)",
  boxShadow: "0 15px 35px rgba(124,58,237,0.12)"
});

const goalCard = (color, dark) => ({
  mb: 2,
  p: 2,
  borderRadius: 2,
  background: dark ? "rgba(255,255,255,0.02)" : "#f8fafc",
  border: `1px solid ${color || "rgba(124,58,237,0.25)"}`,
  boxShadow: `0 15px 35px ${color || "rgba(124,58,237,0.2)"}`,
  transition: "0.4s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 25px 60px ${color || "rgba(124,58,237,0.35)"}`
  }
});

const bar = (dark) => ({
  height: 6,
  background: dark ? "#1f2937" : "#e5e7eb",
  borderRadius: 10,
  mt: 1
});