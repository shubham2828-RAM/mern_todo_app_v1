import { useState } from 'react';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  const [busy, setBusy] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5">
        <p className="mb-5 text-sm">{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="rounded-lg px-4 py-2 text-sm hover:bg-slate-100">
            Cancel
          </button>
          <button
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              await onConfirm();
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}