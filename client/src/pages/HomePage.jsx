import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { formatDate, toISODate, weekKey } from '../utils/dates';
import { getStats } from '../utils/taskHelpers';
import DateSelector from '../components/DateSelector';
import WeeklyProgress from '../components/WeeklyProgress';
import TaskList from '../components/TaskList';

export default function HomePage() {
  const navigate = useNavigate();
  const { tasks, loading, error, load, openForm } = useTasks();
  const today = toISODate(new Date());
  const [selected, setSelected] = useState(today);

  const weekTasks = tasks.filter((t) => weekKey(t.date) === weekKey(selected));
  const stats = getStats(weekTasks);
  const dayTasks = tasks.filter((t) => t.date === selected);

  return (
    <div className="flex min-h-screen flex-col md:min-h-[700px]">
      <div className="flex-1 space-y-5 p-5">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            readOnly
            placeholder="Search tasks"
            aria-label="Search tasks"
            onFocus={() => navigate('/search')}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm"
          />
        </div>

        <DateSelector selected={selected} onChange={setSelected} />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-blue-50 p-4">
            <p className="text-2xl font-bold text-blue-700">{stats.completed}</p>
            <p className="text-sm text-slate-600">Completed</p>
          </div>
          <div className="rounded-2xl bg-rose-50 p-4">
            <p className="text-2xl font-bold text-rose-600">{stats.open}</p>
            <p className="text-sm text-slate-600">Pending</p>
          </div>
        </div>

        <section>
          <h2 className="mb-2 font-semibold">Weekly Progress</h2>
          <WeeklyProgress stats={stats} />
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{selected === today ? 'Tasks Today' : `Tasks · ${formatDate(selected)}`}</h2>
            <Link to="/tasks" className="text-sm text-blue-600">
              View All
            </Link>
          </div>
          <p className="mb-1 text-xs text-slate-400">Sorted by start time</p>

          {loading && <p className="py-6 text-center text-sm text-slate-400">Loading…</p>}
          {error && (
            <p className="py-6 text-center text-sm text-red-600">
              {error}{' '}
              <button onClick={load} className="underline">
                Retry
              </button>
            </p>
          )}
          {!loading && !error && <TaskList tasks={dayTasks} />}
        </section>
      </div>

      <div className="sticky bottom-6 flex justify-end px-5 pb-5">
        <button
          onClick={() => openForm()}
          aria-label="Add task"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          <Plus size={26} />
        </button>
      </div>
    </div>
  );
}