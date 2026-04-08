import { useState } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

const PRIORITIES = ["low", "medium", "high"];

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }
    setError("");
    onAdd({
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      dueDate,
      priority,
      createdAt: Date.now(),
    });
    setTitle("");
    setDueDate("");
    setPriority("medium");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
          Task
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(""); }}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className={`w-full rounded-xl border ${
            error ? "border-red-300 bg-red-50" : "border-slate-100 bg-slate-50"
          } px-4 py-3 text-sm text-slate-800 placeholder-slate-300 focus:border-secondary focus:bg-white focus:shadow-glow transition-all duration-200 font-medium`}
        />
        {error && (
          <p className="text-xs text-red-400 mt-1 font-medium">{error}</p>
        )}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-secondary focus:bg-white focus:shadow-glow transition-all duration-200 font-mono"
          />
        </div>

        <div className="flex-1">
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5">
            Priority
          </label>
          <div className="flex gap-1.5 h-[46px]">
            {PRIORITIES.map((p) => {
              const colors = {
                low: priority === p
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-slate-50 text-emerald-600 border-emerald-200 hover:border-emerald-400",
                medium: priority === p
                  ? "bg-amber-400 text-white border-amber-400"
                  : "bg-slate-50 text-amber-600 border-amber-200 hover:border-amber-400",
                high: priority === p
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-slate-50 text-red-500 border-red-200 hover:border-red-400",
              };
              return (
                <motion.button
                  key={p}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setPriority(p)}
                  className={`flex-1 rounded-xl border text-xs font-bold capitalize transition-all duration-150 ${colors[p]}`}
                >
                  {p}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-shadow duration-200"
      >
        + Add Task
      </motion.button>
    </div>
  );
}
