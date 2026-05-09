import { getStats, saveStats } from "./goalsStorage";

export const addProgress = (goal) => {
  const today = new Date().toISOString().split("T")[0];

  let logs = goal.logs || [];

  // جلوگیری از تکرار در یک روز
  if (logs.find((l) => l.date === today)) return goal;

  logs.push({ date: today, amount: 1 });

  let progress = goal.progress + 1;

  let status = "active";
  if (progress >= goal.target) {
    status = "completed";
  }

  // 🔥 XP
  const stats = getStats();
  stats.xp += 20;

  // 🔥 STREAK
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const y = yesterday.toISOString().split("T")[0];

  if (logs.find((l) => l.date === y)) {
    stats.streak += 1;
  } else {
    stats.streak = 1;
  }

  saveStats(stats);

  return {
    ...goal,
    logs,
    progress,
    status
  };
};