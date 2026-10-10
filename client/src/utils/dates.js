const pad = (n) => String(n).padStart(2, '0');

export const toISODate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const parseISODate = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

// Weeks start on Monday
export const startOfWeek = (d) => {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return addDays(x, -((x.getDay() + 6) % 7));
};

export const getWeekDays = (d) => {
  const start = startOfWeek(d);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const weekKey = (iso) => toISODate(startOfWeek(parseISODate(iso)));

const short = (d) => d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
export const formatWeekRange = (key) => {
  const start = parseISODate(key);
  return `${short(start)} – ${short(addDays(start, 6))}`;
};
export const formatDate = (iso) => short(parseISODate(iso));