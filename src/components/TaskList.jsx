import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-14 gap-3"
      >
        <span className="text-4xl select-none">✦</span>
        <p className="text-slate-300 text-sm font-medium tracking-wide">
          No tasks here
        </p>
      </motion.div>
    );
  }

  return (
    <ul className="space-y-2">
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
