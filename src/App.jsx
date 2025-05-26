import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'


  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([{ text: input, completed: false }, ...tasks]);
    setInput('');
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const filteredTasks = tasks
    .filter((task) =>
      filter === 'all'
        ? true
        : filter === 'active'
          ? !task.completed
          : task.completed
    )
    .sort((a, b) => a.completed - b.completed); // Completed go last

  return (
    <div className="bg-[#1e293b] min-h-screen text-white">
      <Navbar />
      <main className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6 text-teal-300">Your Tasks</h2>

        {/* Input Area */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask();
              }
            }}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg bg-[#334155] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={addTask}
            className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg font-semibold transition-all"
          >
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6 text-sm font-medium">
          {/* Filter Buttons */}
          <div className="flex gap-3">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full border ${filter === f
                  ? 'bg-teal-600 border-teal-500'
                  : 'bg-[#334155] border-gray-600 hover:bg-[#475569]'
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Delete All Button */}
          <button
            onClick={() => setTasks([])}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
          >
            Delete All
          </button>
        </div>



        {/* Task List */}
        <ul className="space-y-3">
          {filteredTasks.length === 0 && (
            <p className="text-gray-400 italic">No tasks found.</p>
          )}
          {filteredTasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-[#334155] rounded-lg p-3 shadow-sm"
            >
              <span
                className={`flex-1 text-sm ${task.completed
                  ? 'line-through text-gray-400 italic'
                  : 'text-white'
                  }`}
              >
                {task.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    toggleComplete(tasks.indexOf(task)) // use actual index from original list
                  }
                  className={`text-xs px-3 py-1 rounded-full font-medium transition ${task.completed
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => deleteTask(tasks.indexOf(task))}
                  className="text-xs px-3 py-1 rounded-full bg-red-500 hover:bg-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App
