import { useState } from 'react'
import './App.css'

import { getContract } from "./utils/contract";

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

function App() {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState<Task | null>(null);

  const createTask = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.createTask(taskDescription);
      await tx.wait();
      alert("Task created!");
      setTaskDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const getTask = async () => {
    try {
      const contract = await getContract();
      const t = await contract.getTask(Number(taskId));
      setTask({
        id: Number(t[0]),
        description: t[1],
        completed: t[2],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const completeTask = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.completeTask(Number(taskId));
      await tx.wait();
      alert("Task completed!");
      getTask();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.updateTask(Number(taskId), taskDescription);
      await tx.wait();
      alert("Task updated!");
      getTask();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ToDo Dapp</h1>

      <div>
        <input
          type="text"
          placeholder="Task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button onClick={createTask}>Create Task</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <input
          type="number"
          placeholder="Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <button onClick={getTask}>Get Task</button>
        <button onClick={completeTask}>Complete Task</button>
        <button onClick={updateTask}>Update Task</button>
      </div>

      {task && (
        <div style={{ marginTop: 20 }}>
          <h3>Task #{task.id}</h3>
          <p>Description: {task.description}</p>
          <p>Status: {task.completed ? "✅ Completed" : "❌ Not completed"}</p>
        </div>
      )}
    </div>
  );
}

export default App
