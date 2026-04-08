import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const STORAGE_KEY = "fintech_tasks";

function getStats(tasks) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.completed).length;
  const high = tasks.filter((t) => t.priority === "high" && !t.completed).length;
  return { total, done, high };
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks((prev) => [task, ...prev]);

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const editTask = (id, updated) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
    );

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  const stats = getStats(tasks);

  return (
    <div className="min-h-screen bg-background font-display px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs font-mono font-medium tracking-widest text-secondary uppercase">
                Workspace
              </span>
            </div>
            <h1 className="text-3xl font-bold text-primary leading-tight tracking-tight">
              My Tasks
            </h1>
          </div>
          <div className="flex gap-3">
            {[
              { label: "Total", value: stats.total, color: "text-primary" },
              { label: "Done", value: stats.done, color: "text-emerald-500" },
              { label: "Urgent", value: stats.high, color: "text-red-500" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-card rounded-2xl shadow-card px-4 py-2.5 text-center min-w-[58px]"
              >
                <div className={`text-xl font-bold font-mono ${s.color}`}>
                  {s.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-medium mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-3xl shadow-card p-6 mb-5">
          <TaskForm onAdd={addTask} />
        </div>

        <div className="flex gap-2 mb-4">
          {["all", "active", "done"].map((f) => (
            <motion.button
              key={f}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
                filter === f
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-sm"
                  : "bg-card text-slate-400 hover:text-primary shadow-card"
              }`}
            >
              {f}
            </motion.button>
          ))}
          <span className="ml-auto text-xs text-slate-400 self-center font-mono">
            {filtered.length} task{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="bg-card rounded-3xl shadow-card p-4 min-h-[120px]">
          <TaskList
            tasks={filtered}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onEdit={editTask}
          />
        </div>

        <p className="text-center text-xs text-slate-300 mt-6 font-mono tracking-wider">
          tasks · synced locally
        </p>
      </motion.div>
    </div>
  );
}
