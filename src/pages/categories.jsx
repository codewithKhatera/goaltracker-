import { Box, Typography } from "@mui/material";
import { useApp } from "../context/AppProvider";
import { useMemo } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Categories() {
  const { goals = [], lang, dark } = useApp();

  const t = {
    en: {
      title: "Categories Overview",
      chart: "Category Progress",
      active: "Active",
      completed: "Completed",
      total: "Total"
    },
    fa: {
      title: "بررسی دسته‌بندی‌ها",
      chart: "پیشرفت دسته‌ها",
      active: "فعال",
      completed: "تکمیل شده",
      total: "کل"
    }
  };

  const data = useMemo(() => {
    const map = {};

    goals.forEach((g) => {
      const cat = g.category || "Unknown";

      if (!map[cat]) {
        map[cat] = {
          name: cat,
          active: 0,
          completed: 0,
          total: 0
        };
      }

      map[cat].total += 1;

      if (g.status === "completed") map[cat].completed += 1;
      else map[cat].active += 1;
    });

    return Object.values(map);
  }, [goals]);

  return (
    <Box
      p={3}
      dir={lang === "fa" ? "rtl" : "ltr"}
      sx={{
        minHeight: "100vh",
        background: dark
          ? "linear-gradient(135deg,#0b1220,#0f172a,#111827)"
          : "#f6f7fb",
        color: dark ? "#e5e7eb" : "#0f172a",
        transition: "0.3s"
      }}
    >
      {/* HEADER */}
      <Typography fontSize={26} fontWeight="bold" mb={3}>
        📊 {t[lang].title}
      </Typography>

      {/* CHART */}
      <Box sx={card(dark)} mb={3}>
        <Typography mb={2} fontWeight="bold">
          {t[lang].chart}
        </Typography>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke={dark ? "#94a3b8" : "#334155"} />
            <YAxis stroke={dark ? "#94a3b8" : "#334155"} />
            <Tooltip
              contentStyle={{
                background: dark ? "#0f172a" : "#ffffff",
                border: "1px solid rgba(124,58,237,0.25)",
                borderRadius: 12,
                color: dark ? "#fff" : "#000"
              }}
            />

            {/* 🎨 NEW COLOR SYSTEM */}
            <Bar dataKey="active" fill="#6366f1" radius={[6, 6, 0, 0]} />
            <Bar dataKey="completed" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* CARDS */}
      <Box sx={grid}>
        {data.map((c) => {
          const percent =
            c.total > 0 ? (c.completed / c.total) * 100 : 0;

          return (
            <Box key={c.name} sx={card(dark)}>
              <Typography fontWeight="bold" fontSize={16}>
                {c.name}
              </Typography>

              <Typography fontSize={13} mt={1}>
                🔵 {t[lang].active}: {c.active}
              </Typography>

              <Typography fontSize={13}>
                🟢 {t[lang].completed}: {c.completed}
              </Typography>

              <Typography fontSize={12} mt={1} sx={{ opacity: 0.7 }}>
                {t[lang].total}: {c.total}
              </Typography>

              {/* PROGRESS BAR */}
              <Box sx={bar(dark)}>
                <Box
                  sx={{
                    width: `${percent}%`,
                    height: "100%",
                    background:
                      "linear-gradient(90deg,#6366f1,#10b981)",
                    borderRadius: 10,
                    transition: "0.4s"
                  }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/* ================= STYLES ================= */

const card = (dark) => ({
  p: 3,
  borderRadius: 3,
  background: dark
    ? "rgba(255,255,255,0.04)"
    : "#ffffff",
  border: dark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(99,102,241,0.15)",
  boxShadow: dark
    ? "0 12px 30px rgba(0,0,0,0.4)"
    : "0 10px 25px rgba(99,102,241,0.12)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: dark
      ? "0 18px 40px rgba(0,0,0,0.5)"
      : "0 15px 35px rgba(99,102,241,0.25)"
  }
});

const grid = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2,1fr)",
    md: "repeat(3,1fr)"
  },
  gap: 2
};

const bar = (dark) => ({
  height: 7,
  background: dark ? "#1f2937" : "#e5e7eb",
  borderRadius: 10,
  mt: 2
});