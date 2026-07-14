import React from 'react';

const AlertDialog = ({ isOpen, title, message, type, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn text-slate-800">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl relative text-left">
        <h3 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2 flex items-center gap-2">
          {type === 'error' && <span className="text-red-500">⚠️</span>}
          {type === 'warning' && <span className="text-amber-500">⚠️</span>}
          {type === 'success' && <span className="text-emerald-500">✅</span>}
          {type === 'confirm' && <span className="text-indigo-500">❓</span>}
          {title}
        </h3>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed whitespace-pre-line">
          {message}
        </p>
        <div className="flex justify-end gap-3 text-xs font-bold">
          {type === 'confirm' ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (onConfirm) onConfirm();
                  onClose();
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer shadow-md"
              >
                Yes, Submit
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer shadow-md"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
