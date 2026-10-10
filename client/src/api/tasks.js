const BASE = '/api/tasks';

async function request(url, options = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    err.fields = data.errors || {};
    throw err;
  }
  return data;
}

export const getTasks = (search = '') => request(`${BASE}?search=${encodeURIComponent(search)}`);
export const createTask = (task) => request(BASE, { method: 'POST', body: JSON.stringify(task) });
export const updateTask = (id, task) => request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(task) });
export const deleteTask = (id) => request(`${BASE}/${id}`, { method: 'DELETE' });