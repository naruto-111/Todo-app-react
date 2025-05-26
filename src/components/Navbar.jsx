import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-teal-400">📝 ToDoList</h1>
        <div className="space-x-6 hidden md:flex">
          <a href="#" className="hover:text-teal-300">Home</a>
          <a href="#" className="hover:text-teal-300">Tasks</a>
          <a href="#" className="hover:text-teal-300">About</a>
        </div>
      </div>
    </nav>
  );
}
