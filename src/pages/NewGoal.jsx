import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppProvider";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function NewGoal() {
  const { setGoals, lang, dark } = useApp();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const isDark = dark;

  const textColor = isDark ? "#e5e7eb" : "#0f172a";
  const bgField = isDark ? "rgba(255,255,255,0.05)" : "#ffffff";

  const [form, setForm] = useState({
    title: "",
    category: "",
    type: "daily",
    target: "",
    startDate: null,
    endDate: null,
    notes: "",
    priority: "medium",
    difficulty: "easy",
    color: "#7c3aed",
    icon: "🎯"
  });

  const t = {
    en: {
      title: "Create Goal",
      titleField: "Title",
      target: "Target",
      category: "Category",
      type: "Type",
      start: "Start Date",
      end: "End Date",
      notes: "Notes",
      priority: "Priority",
      difficulty: "Difficulty",
      save: "Save",
      cancel: "Cancel",
      error: "Please fill required fields"
    },
    fa: {
      title: "ساخت هدف",
      titleField: "عنوان",
      target: "هدف",
      category: "دسته‌بندی",
      type: "نوع",
      start: "تاریخ شروع",
      end: "تاریخ پایان",
      notes: "یادداشت",
      priority: "اولویت",
      difficulty: "سختی",
      save: "ذخیره",
      cancel: "لغو",
      error: "لطفاً فیلدهای ضروری را پر کنید"
    }
  };

  const categories = [
    "Travel","Health","Study","Work","Fitness",
    "Finance","Personal","Coding","Language","Business"
  ];

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.category || !form.target || !form.startDate) {
      setError(t[lang].error);
      return;
    }

    const newGoal = {
      id: Date.now(),
      ...form,
      target: Number(form.target),
      progress: 0,
      status: "active",
      logs: [],
      startDate: dayjs(form.startDate).format("YYYY-MM-DD"),
      endDate: form.endDate
        ? dayjs(form.endDate).format("YYYY-MM-DD")
        : null,
      createdAt: new Date().toISOString()
    };

    setGoals((prev) => [newGoal, ...prev]);
    navigate("/goals");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        p={4}
        dir={lang === "fa" ? "rtl" : "ltr"}
        sx={{
          minHeight: "100vh",
          background: isDark
            ? "linear-gradient(135deg,#0b1220,#111827)"
            : "#f6f7fb",
          color: textColor
        }}
      >

        {/* TITLE */}
        <Typography fontSize={26} fontWeight="bold" mb={3}>
          ✨ {t[lang].title}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* CARD */}
        <Box sx={card(isDark)}>

          <Box sx={grid}>

            <TextField
              label={t[lang].titleField}
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              fullWidth
              sx={fieldStyle(isDark, bgField)}
            />

            <TextField
              label={t[lang].target}
              type="number"
              value={form.target}
              onChange={(e) => handleChange("target", e.target.value)}
              fullWidth
              sx={fieldStyle(isDark, bgField)}
            />

            <FormControl fullWidth>
              <InputLabel sx={{ color: textColor }}>
                {t[lang].category}
              </InputLabel>
              <Select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                sx={{ color: textColor }}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: textColor }}>
                {t[lang].type}
              </InputLabel>
              <Select
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
                sx={{ color: textColor }}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="count">Count</MenuItem>
                <MenuItem value="time">Time</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: textColor }}>
                {t[lang].priority}
              </InputLabel>
              <Select
                value={form.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                sx={{ color: textColor }}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel sx={{ color: textColor }}>
                {t[lang].difficulty}
              </InputLabel>
              <Select
                value={form.difficulty}
                onChange={(e) => handleChange("difficulty", e.target.value)}
                sx={{ color: textColor }}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>

            <TextField
              type="color"
              value={form.color}
              onChange={(e) => handleChange("color", e.target.value)}
              fullWidth
              sx={fieldStyle(isDark, bgField)}
            />

            <TextField
              label="Icon"
              value={form.icon}
              onChange={(e) => handleChange("icon", e.target.value)}
              fullWidth
              sx={fieldStyle(isDark, bgField)}
            />

            <DatePicker
              label={t[lang].start}
              value={form.startDate}
              onChange={(v) => handleChange("startDate", v)}
              slotProps={{
                textField: { fullWidth: true }
              }}
            />

            <DatePicker
              label={t[lang].end}
              value={form.endDate}
              onChange={(v) => handleChange("endDate", v)}
              slotProps={{
                textField: { fullWidth: true }
              }}
            />

          </Box>

          <TextField
            label={t[lang].notes}
            multiline
            rows={4}
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            fullWidth
            sx={{ mt: 3, ...fieldStyle(isDark, bgField) }}
          />

          {/* BUTTONS */}
          <Box display="flex" gap={2} mt={3}>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg,#7c3aed,#3b82f6)"
              }}
              onClick={handleSubmit}
            >
              {t[lang].save}
            </Button>

            <Button variant="outlined" onClick={() => navigate("/goals")}>
              {t[lang].cancel}
            </Button>
          </Box>

        </Box>
      </Box>
    </LocalizationProvider>
  );
}

/* STYLES */

const card = (dark) => ({
  p: 4,
  borderRadius: 3,
  background: dark ? "rgba(255,255,255,0.03)" : "#ffffff",
  border: "1px solid rgba(124,58,237,0.2)",
  boxShadow: "0 10px 30px rgba(124,58,237,0.15)"
});

const grid = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2,1fr)",
    md: "repeat(3,1fr)"
  },
  gap: 3
};

const fieldStyle = (dark, bg) => ({
  background: bg,
  borderRadius: 2
});