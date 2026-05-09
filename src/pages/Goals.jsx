import {
  Box,
  Typography,
  Button,
  TextField,
  Tabs,
  Tab,
  MenuItem,
  Select,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppProvider";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Goals() {
  const { goals = [], setGoals, addProgress, lang, dark } = useApp();
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [deleteId, setDeleteId] = useState(null);

  const t = {
    en: ["All", "Active", "Completed", "Paused", "Deleted"],
    fa: ["همه", "فعال", "تکمیل شده", "متوقف", "حذف شده"]
  };

  const tabMap = ["all", "active", "completed", "paused", "deleted"];

  const filtered = useMemo(() => {
    let list = [...goals];

    const status = tabMap[tab];
    if (status !== "all") {
      list = list.filter((g) => g.status === status);
    }

    list = list.filter((g) =>
      (g.title || "").toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "progress") {
      list.sort(
        (a, b) =>
          (b.progress || 0) / (b.target || 1) -
          (a.progress || 0) / (a.target || 1)
      );
    } else if (sort === "category") {
      list.sort((a, b) =>
        (a.category || "").localeCompare(b.category || "")
      );
    } else {
      list.sort(
        (a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    }

    return list;
  }, [goals, tab, search, sort]);

  const togglePause = (id) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, status: g.status === "paused" ? "active" : "paused" }
          : g
      )
    );
  };

  const deleteGoal = () => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === deleteId ? { ...g, status: "deleted" } : g
      )
    );
    setDeleteId(null);
  };

  const textColor = dark ? "#e6e9f5" : "#111827";
  const subText = dark ? "rgba(230,233,245,0.7)" : "#4b5563";

  return (
    <Box
      p={3}
      dir={lang === "fa" ? "rtl" : "ltr"}
      sx={{
        transition: "0.3s ease",
        background: dark ? "#0a0f1f" : "#f6f7fb",
        color: textColor,
        minHeight: "100vh"
      }}
    >

      {/* HEADER */}
      <Box sx={card(dark)}>
        <Typography fontSize={22}>
          {lang === "fa" ? "اهداف" : "Goals"}
        </Typography>
      </Box>

      {/* CONTROLS */}
      <Box sx={card(dark)}>

        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 2 }}>
          {t[lang].map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>

        <Box display="flex" gap={2} flexWrap="wrap" sx={{ mb: 2 }}>
          <TextField
            size="small"
            placeholder={lang === "fa" ? "جستجو..." : "Search..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ input: { color: textColor } }}
          />

          <Select
            size="small"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            sx={{ color: textColor }}
          >
            <MenuItem value="newest">
              {lang === "fa" ? "جدیدترین" : "Newest"}
            </MenuItem>
            <MenuItem value="progress">
              {lang === "fa" ? "پیشرفت" : "Progress"}
            </MenuItem>
            <MenuItem value="category">
              {lang === "fa" ? "دسته‌بندی" : "Category"}
            </MenuItem>
          </Select>

          <Button onClick={() => navigate("/goals/new")}>
            {lang === "fa" ? "+ هدف جدید" : "+ New Goal"}
          </Button>
        </Box>

      </Box>

      {/* GRID */}
      <Box sx={grid}>

        {filtered.length === 0 && (
          <Box sx={{ textAlign: "center", opacity: 0.6, mt: 4 }}>
            {lang === "fa"
              ? "هیچ هدفی پیدا نشد"
              : "No goals found"}
          </Box>
        )}

        {filtered.map((g) => {
          const percent = Math.min(
            100,
            ((g.progress || 0) / (g.target || 1)) * 100
          );

          return (
            <Box key={g.id} sx={goalCard(dark)}>

              <Typography fontWeight="bold">
                {g.title}
              </Typography>

              <Typography fontSize={12} color={subText}>
                {g.category}
              </Typography>

              <Typography fontSize={11} mt={1} color={subText}>
                {lang === "fa" ? "شروع:" : "Start:"} {g.startDate || "-"}
              </Typography>

              <Typography fontSize={11} color={subText}>
                {lang === "fa" ? "ددلاین:" : "Deadline:"} {g.endDate || "-"}
              </Typography>

              <Typography fontSize={12} mt={1}>
                {g.progress || 0} / {g.target || 1}
              </Typography>

              {/* PROGRESS BAR */}
              <Box sx={bar(dark)}>
                <Box
                  sx={{
                    width: `${percent}%`,
                    height: "100%",
                    borderRadius: 10,
                    background: dark
                      ? "linear-gradient(90deg,#22d3ee,#a855f7)"
                      : "linear-gradient(90deg,#3b82f6,#22c55e)",
                    transition: "0.5s ease",
                    boxShadow: "0 0 12px rgba(168,85,247,0.4)"
                  }}
                />
              </Box>

              {/* ACTIONS */}
              <Box display="flex" gap={1} mt={1}>
                <Button onClick={() => addProgress(g.id)}>
                  +1
                </Button>

                <IconButton onClick={() => navigate(`/goals/${g.id}`)}>
                  <EditIcon />
                </IconButton>

                <IconButton onClick={() => togglePause(g.id)}>
                  {g.status === "paused" ? (
                    <PlayArrowIcon />
                  ) : (
                    <PauseIcon />
                  )}
                </IconButton>

                <IconButton onClick={() => setDeleteId(g.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>

            </Box>
          );
        })}
      </Box>

      {/* DELETE DIALOG */}
      <Dialog open={!!deleteId}>
        <DialogTitle>
          {lang === "fa" ? "حذف هدف؟" : "Delete Goal?"}
        </DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>
            {lang === "fa" ? "لغو" : "Cancel"}
          </Button>
          <Button color="error" onClick={deleteGoal}>
            {lang === "fa" ? "حذف" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

/* 🎨 STYLES */

const card = (dark) => ({
  p: 3,
  mb: 3,
  borderRadius: 2,
  backdropFilter: "blur(14px)",
  background: dark
    ? "rgba(255,255,255,0.04)"
    : "rgba(255,255,255,0.9)",
  border: dark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(0,0,0,0.06)",
  boxShadow: dark
    ? "0 12px 35px rgba(0,0,0,0.6)"
    : "0 12px 35px rgba(0,0,0,0.08)"
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

const goalCard = (dark) => ({
  p: 2,
  borderRadius: 2,
  transition: "0.35s ease",
  background: dark ? "rgba(255,255,255,0.05)" : "#ffffff",
  border: dark
    ? "1px solid rgba(168,85,247,0.25)"
    : "1px solid rgba(99,102,241,0.15)",
  boxShadow: dark
    ? "0 10px 30px rgba(168,85,247,0.15)"
    : "0 10px 30px rgba(99,102,241,0.12)",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: dark
      ? "0 18px 45px rgba(168,85,247,0.25)"
      : "0 18px 45px rgba(99,102,241,0.25)"
  }
});

const bar = (dark) => ({
  height: 6,
  background: dark ? "#111827" : "#e5e7eb",
  borderRadius: 10,
  mt: 1
});