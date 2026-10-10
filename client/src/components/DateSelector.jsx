import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addDays, getWeekDays, parseISODate, toISODate } from '../utils/dates';

export default function DateSelector({ selected, onChange }) {
  const selectedDate = parseISODate(selected);
  const days = getWeekDays(selectedDate);

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onChange(toISODate(addDays(selectedDate, -7)))} aria-label="Previous week" className="rounded p-1 hover:bg-slate-100">
        <ChevronLeft size={18} />
      </button>
      <div className="grid flex-1 grid-cols-7 gap-1">
        {days.map((d) => {
          const iso = toISODate(d);
          const active = iso === selected;
          return (
            <button
              key={iso}
              onClick={() => onChange(iso)}
              className={`rounded-xl py-2 text-center ${active ? 'bg-blue-600 text-white' : 'hover:bg-slate-100'}`}
            >
              <span className="block text-[11px]">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span className="block text-sm font-semibold">{d.getDate()}</span>
            </button>
          );
        })}
      </div>
      <button onClick={() => onChange(toISODate(addDays(selectedDate, 7)))} aria-label="Next week" className="rounded p-1 hover:bg-slate-100">
        <ChevronRight size={18} />
      </button>
    </div>
  );
}