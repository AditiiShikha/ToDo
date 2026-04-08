import { useState } from "react";
import { motion } from "framer-motion";

const PRIORITY_BORDER = {
  high: "border-l-red-500",
  medium: "border-l-amber-400",
  low: "border-l-emerald-500",
};

const PRIORITY_BADGE = {
  high: "bg-red-50 text-red-500",
  medium: "bg-amber-50 text-amber-500",
  low: "bg-emerald-50 text-emerald-600",
};

function formatDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split("-");
  return `${d}/${m}/${y}`;
}

function isOverdue(dueDate, completed) {
  if (!dueDate || completed) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export default function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDate, setEditDate] = useState(task.dueDate);
  const [editPriority, setEditPriority] = useState(task.priority);

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, {
      title: editTitle.trim(),
      dueDate: editDate,
      priority: editPriority,
    });
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(task.title);
    setEditDate(task.dueDate);
    setEditPriority(task.priority);
    setEditing(false);
  };

  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, x: 48, scale: 0.95, transition: { duration: 0.22 } }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white rounded-2xl border-l-4 shadow-sm px-4 py-3.5 flex flex-col gap-2 transition-opacity duration-200 ${
        PRIORITY_BORDER[task.priority]
      } ${task.completed ? "opacity-50" : "opacity-100"}`}
    >
      {editing ? (
        <div className="space-y-2.5">
          <input
            autoFocus
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") cancelEdit(); }}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-secondary focus:shadow-glow transition-all"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-600 focus:border-secondary transition-all"
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 capitalize focus:border-secondary transition-all"
            >
              {["low", "medium", "high"].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={saveEdit}
              className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold"
            >
              Save
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={cancelEdit}
              className="flex-1 py-1.5 rounded-lg border border-slate-200 text-slate-400 text-xs font-semibold hover:bg-slate-50"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => onToggle(task.id)}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? "bg-gradient-to-br from-primary to-secondary border-transparent"
                : "border-slate-300 hover:border-secondary"
            }`}
          >
            {task.completed && (
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 10" fill="none">
                <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </motion.button>

          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-semibold text-slate-800 leading-snug transition-all duration-200 ${
                task.completed ? "line-through text-slate-400" : ""
              }`}
            >
              {task.title}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {task.dueDate && (
                <span
                  className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-md ${
                    overdue
                      ? "bg-red-50 text-red-400"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {overdue ? "⚠ " : ""}
                  {formatDate(task.dueDate)}
                </span>
              )}
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${PRIORITY_BADGE[task.priority]}`}
              >
                {task.priority}
              </span>
            </div>
          </div>

          <div className="flex gap-1 flex-shrink-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setEditing(true)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-secondary hover:bg-indigo-50 transition-all"
              title="Edit"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M11.5 2.5a1.414 1.414 0 012 2L5 13H3v-2L11.5 2.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(task.id)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all"
              title="Delete"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                <path d="M3 4h10M6 4V3h4v1M5 4v8a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </div>
        </div>
      )}
    </motion.li>
  );
}
