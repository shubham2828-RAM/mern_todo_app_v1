import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as api from '../api/tasks';

const TasksContext = createContext(null);
export const useTasks = () => useContext(TasksContext);

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [version, setVersion] = useState(0); // bumps after every change so Search can refetch
  const [form, setForm] = useState({ open: false, task: null });

  const load = useCallback(async () => {
    try {
      setError('');
      setTasks(await api.getTasks());
      setVersion((v) => v + 1);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  // Throws on failure so the form can show errors
  const saveTask = async (data, id) => {
    if (id) await api.updateTask(id, data);
    else await api.createTask(data);
    await load();
    notify(id ? 'Task updated' : 'Task created');
  };

  const toggleTask = async (task) => {
    try {
      await api.updateTask(task._id, { status: task.status === 'Completed' ? 'In Progress' : 'Completed' });
      await load();
    } catch (e) {
      notify(e.message);
    }
  };

  const removeTask = async (id) => {
    try {
      await api.deleteTask(id);
      notify('Task deleted');
    } catch (e) {
      notify(e.status === 404 ? 'Task was already deleted' : e.message);
    }
    await load();
  };

  const openForm = (task = null) => setForm({ open: true, task });
  const closeForm = () => setForm({ open: false, task: null });

  return (
    <TasksContext.Provider
      value={{ tasks, loading, error, toast, version, form, load, saveTask, toggleTask, removeTask, openForm, closeForm }}
    >
      {children}
    </TasksContext.Provider>
  );
}