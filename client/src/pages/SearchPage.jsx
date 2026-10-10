import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as api from '../api/tasks';
import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/TaskList';

export default function SearchPage() {
  const navigate = useNavigate();
  const { version } = useTasks();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const [input, setInput] = useState(q);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  // Debounce: update the URL query 300ms after typing stops
  useEffect(() => {
    const t = setTimeout(() => setParams(input.trim() ? { q: input.trim() } : {}, { replace: true }), 300);
    return () => clearTimeout(t);
  }, [input, setParams]);

  // Fetch from the server whenever the query or tasks change
  useEffect(() => {
    if (!q) {
      setResults([]);
      return;
    }
    let ignore = false;
    api
      .getTasks(q)
      .then((r) => !ignore && (setResults(r), setError('')))
      .catch((e) => !ignore && setError(e.message));
    return () => {
      ignore = true;
    };
  }, [q, version]);

  return (
    <div className="min-h-screen p-5 md:min-h-[700px]">
      <div className="mb-4 flex items-center gap-2">
        <button onClick={() => navigate('/home')} aria-label="Back" className="rounded p-2 hover:bg-slate-100">
          <ArrowLeft size={20} />
        </button>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search tasks"
          aria-label="Search tasks"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-blue-600 focus:outline-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {!q ? <p className="py-8 text-center text-sm text-slate-400">Type to search titles and descriptions.</p> : <TaskList tasks={results} />}
    </div>
  );
}