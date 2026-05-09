import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

// 📅 helpers
const today = () => new Date().toISOString().split("T")[0];

const yesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};

export function AppProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [dark, setDark] = useState(true);

  // 💾 goals
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });

  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp")) || 0);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("streak")) || 0);

  // 💾 persist
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("xp", xp);
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  // 🔥 FIXED PROGRESS SYSTEM
  const addProgress = (id) => {
    const todayStr = today();
    const yesterdayStr = yesterday();

    let xpToAdd = 0;
    let shouldUpdateStreak = false;
    let hasYesterdayLog = false;

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;

        const logs = g.logs || [];

        // ❗ فقط برای daily محدودیت بگذار
        const alreadyLoggedToday =
          g.type === "daily" &&
          logs.some((l) => l.date === todayStr);

        if (alreadyLoggedToday) return g;

        const newLogs = [...logs, { date: todayStr, amount: 1 }];

        const newProgress = (g.progress || 0) + 1;
        const isCompleted = newProgress >= (g.target || 1);

        // فقط مقدار نگه دار
        xpToAdd = 10;

        if (g.type === "daily") {
          shouldUpdateStreak = true;
          hasYesterdayLog = logs.some((l) => l.date === yesterdayStr);
        }

        return {
          ...g,
          logs: newLogs,
          progress: isCompleted ? g.target : newProgress,
          status: isCompleted ? "completed" : g.status
        };
      })
    );

    // ✅ بیرون از setGoals اجرا شود
    if (xpToAdd) {
      setXp((x) => x + xpToAdd);
    }

    if (shouldUpdateStreak) {
      setStreak((s) => (hasYesterdayLog ? s + 1 : 1));
    }
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        dark,
        setDark,
        goals,
        setGoals,
        xp,
        setXp,
        streak,
        setStreak,
        addProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);