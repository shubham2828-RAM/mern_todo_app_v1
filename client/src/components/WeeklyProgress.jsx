export default function WeeklyProgress({ stats }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-500">
        <span>
          {stats.completed}/{stats.total} completed
        </span>
        <span>{stats.percent}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={stats.percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${stats.percent}%` }} />
      </div>
    </div>
  );
}