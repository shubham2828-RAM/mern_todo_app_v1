import { Route, Routes } from 'react-router-dom';
import { TasksProvider, useTasks } from './hooks/useTasks';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import AllTasksPage from './pages/AllTasksPage';
import TaskFormSheet from './components/TaskFormSheet';

function Shell() {
  const { toast } = useTasks();
  return (
    <>
      <div className="mx-auto min-h-screen max-w-xl bg-white md:my-6 md:min-h-0 md:overflow-hidden md:rounded-3xl md:border md:border-slate-200">
        <Routes>
          <Route path="/" element={<OnboardingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tasks" element={<AllTasksPage />} />
        </Routes>
      </div>
      <TaskFormSheet />
      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
          {toast}
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <TasksProvider>
      <Shell />
    </TasksProvider>
  );
}