import { Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/dates';

const PRIORITY_COLOR = { Low: 'text-green-600', Medium: 'text-amber-600', High: 'text-red-600' };

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const done = task.status === 'Completed';
  return (
    <li className="flex items-center gap-3 py-3">
      <input
        type="checkbox"
        checked={done}
        onChange={onToggle}
        aria-label={`Mark "${task.title}" as ${done ? 'in progress' : 'completed'}`}
        className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
      />
      <div className="min-w-0 flex-1">
        <p className={`truncate font-medium ${done ? 'text-slate-400 line-through' : ''}`}>{task.title}</p>
        <p className="truncate text-xs text-slate-500">
          {formatDate(task.date)} · {task.startTime}
          {task.endTime && ` – ${task.endTime}`} ·{' '}
          <span className={PRIORITY_COLOR[task.priority]}>{task.priority}</span>
        </p>
      </div>
      <button onClick={onEdit} aria-label="Edit task" className="rounded p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Pencil size={18} />
      </button>
      <button onClick={onDelete} aria-label="Delete task" className="rounded p-2 text-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Trash2 size={18} />
      </button>
    </li>
  );
}