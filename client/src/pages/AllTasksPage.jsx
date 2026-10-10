import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { formatWeekRange } from '../utils/dates';
import { getStats, groupByWeek } from '../utils/taskHelpers';
import WeeklyProgress from '../components/WeeklyProgress';
import TaskList from '../components/TaskList';

export default function AllTasksPage() {
  const navigate = useNavigate();
  const { tasks, loading, error } = useTasks();
  const [openKey, setOpenKey] = useState(null);
  const weeks = groupByWeek(tasks);

  return (
    <div className="min-h-screen p-5 md:min-h-[700px]">
      <div className="mb-1 flex items-center gap-2">
        <button onClick={() => navigate('/home')} aria-label="Back" className="rounded p-2 hover:bg-slate-100">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold">All Tasks</h1>
      </div>
      <p className="mb-4 text-xs text-slate-400">Grouped by week (Mon–Sun), sorted by date and time</p>

      {loading && <p className="text-center text-sm text-slate-400">Loading…</p>}
      {error && <p className="text-center text-sm text-red-600">{error}</p>}
      {!loading && !weeks.length && <p className="py-8 text-center text-sm text-slate-400">No tasks yet.</p>}

      <div className="space-y-3">
        {weeks.map(([key, weekTasks]) => {
          const stats = getStats(weekTasks);
          const open = openKey === key;
          return (
            <section key={key} className="rounded-2xl border border-slate-200 p-4">
              <button onClick={() => setOpenKey(open ? null : key)} className="w-full text-left" aria-expanded={open}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-semibold">{formatWeekRange(key)}</span>
                  <span className="text-slate-500">
                    {stats.open} open · {stats.completed} done
                  </span>
                </div>
                <WeeklyProgress stats={stats} />
              </button>
              {open && (
                <div className="mt-3">
                  <TaskList tasks={weekTasks} />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}