import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { toISODate } from '../utils/dates';

const input = 'w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200';
const empty = () => ({ title: '', date: toISODate(new Date()), startTime: '', endTime: '', priority: 'Medium', description: '' });

export default function TaskFormSheet() {
  const { form, closeForm, saveTask } = useTasks();
  const task = form.task;
  const [values, setValues] = useState(empty());
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!form.open) return;
    setErrors({});
    setValues(
      task
        ? { title: task.title, date: task.date, startTime: task.startTime, endTime: task.endTime || '', priority: task.priority, description: task.description || '' }
        : empty()
    );
  }, [form.open, task]);

  if (!form.open) return null;

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!values.title.trim()) e.title = 'Title is required';
    if (!values.date) e.date = 'Date is required';
    if (!values.startTime) e.startTime = 'Start time is required';
    if (values.endTime && values.endTime <= values.startTime) e.endTime = 'End time must be after start time';
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (saving) return; // prevent double submit
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    try {
      await saveTask({ ...values, title: values.title.trim() }, task?._id);
      closeForm();
    } catch (err) {
      setErrors({ ...err.fields, form: err.message });
    } finally {
      setSaving(false);
    }
  };

  const Error = ({ name }) => (errors[name] ? <p className="mt-1 text-xs text-red-600">{errors[name]}</p> : null);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 md:items-center" onClick={closeForm}>
      <form
        onSubmit={submit}
        noValidate
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 md:rounded-3xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{task ? 'Edit Task' : 'Add New Task'}</h2>
          <button type="button" onClick={closeForm} aria-label="Close" className="rounded p-1 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <input className={input} placeholder="Task title" value={values.title} onChange={set('title')} aria-label="Task title" />
            <Error name="title" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-slate-500">Start time</label>
              <input type="time" className={input} value={values.startTime} onChange={set('startTime')} />
              <Error name="startTime" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">End time (optional)</label>
              <input type="time" className={input} value={values.endTime} onChange={set('endTime')} />
              <Error name="endTime" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">Date</label>
            <input type="date" className={input} value={values.date} onChange={set('date')} />
            <Error name="date" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {['Low', 'Medium', 'High'].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setValues((v) => ({ ...v, priority: p }))}
                  className={`rounded-lg border py-2 text-sm ${values.priority === p ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <textarea className={input} rows={3} placeholder="Description (optional)" value={values.description} onChange={set('description')} />
          </div>
        </div>

        {errors.form && <p className="mt-3 text-sm text-red-600">{errors.form}</p>}

        <button type="submit" disabled={saving} className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-medium text-white disabled:opacity-60">
          {saving ? 'Saving…' : task ? 'Save changes' : 'Create task'}
        </button>
      </form>
    </div>
  );
}