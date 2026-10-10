import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskItem from './TaskItem';
import ConfirmDialog from './ConfirmDialog';

export default function TaskList({ tasks }) {
  const { toggleTask, openForm, removeTask } = useTasks();
  const [toDelete, setToDelete] = useState(null);

  if (!tasks.length) return <p className="py-8 text-center text-sm text-slate-400">No tasks here yet.</p>;

  return (
    <>
      <ul className="divide-y divide-slate-100">
        {tasks.map((t) => (
          <TaskItem key={t._id} task={t} onToggle={() => toggleTask(t)} onEdit={() => openForm(t)} onDelete={() => setToDelete(t)} />
        ))}
      </ul>
      {toDelete && (
        <ConfirmDialog
          message={`Delete "${toDelete.title}"? This cannot be undone.`}
          onCancel={() => setToDelete(null)}
          onConfirm={async () => {
            await removeTask(toDelete._id);
            setToDelete(null);
          }}
        />
      )}
    </>
  );
}