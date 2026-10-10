import { weekKey } from './dates';

export const getStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  return {
    total,
    completed,
    open: total - completed,
    percent: total ? Math.round((completed / total) * 100) : 0, // no divide-by-zero
  };
};

// Returns [[weekStartISO, tasks[]], ...] sorted by week
export const groupByWeek = (tasks) => {
  const map = {};
  tasks.forEach((t) => {
    const key = weekKey(t.date);
    (map[key] = map[key] || []).push(t);
  });
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
};