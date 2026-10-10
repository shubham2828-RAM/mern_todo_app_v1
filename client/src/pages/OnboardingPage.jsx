import { useNavigate } from 'react-router-dom';

export default function OnboardingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col md:min-h-[700px]">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-blue-600">
        <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-blue-500" />
        <div className="absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-blue-500" />
        <div className="relative h-36 w-28 rounded-2xl bg-white p-4 shadow-sm">
          {[0, 1, 2].map((i) => (
            <div key={i} className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm border-2 border-blue-600" />
              <div className="h-2 flex-1 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-t-3xl bg-white p-6 text-center">
        <h1 className="text-2xl font-bold">Manage What To Do</h1>
        <p className="mx-auto mt-2 max-w-xs text-sm text-slate-500">Plan your day, track your tasks and stay on top of your week.</p>
        <button onClick={() => navigate('/home')} className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-medium text-white">
          Get Started
        </button>
      </div>
    </div>
  );
}