const KEY = "goals";
const STATS_KEY = "user_stats";

// 🟢 GET
export const getGoals = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

// 🟢 SAVE
export const saveGoals = (goals) => {
  localStorage.setItem(KEY, JSON.stringify(goals));
};

// 🟢 CREATE
export const addGoal = (goal) => {
  const goals = getGoals();
  goals.push(goal);
  saveGoals(goals);
};

// 🟢 UPDATE
export const updateGoal = (id, updated) => {
  const goals = getGoals().map((g) =>
    g.id === id ? { ...g, ...updated } : g
  );
  saveGoals(goals);
};

// 🟢 DELETE
export const deleteGoal = (id) => {
  const goals = getGoals().filter((g) => g.id !== id);
  saveGoals(goals);
};

// 🟢 STATS
export const getStats = () => {
  return JSON.parse(localStorage.getItem(STATS_KEY)) || {
    xp: 0,
    streak: 0
  };
};

export const saveStats = (stats) => {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};