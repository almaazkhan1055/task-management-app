"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavBar from "@/components/ui/navBar";
import EditTask from "../../components/ui/editTask";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://task-management-app-6e356-default-rtdb.firebaseio.com/taskRecord.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();

      const tasksArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setTasks(tasksArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("No task found.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  const handleSaveEdit = async (editedTask) => {
    try {
      const response = await fetch(
        `https://task-management-app-6e356-default-rtdb.firebaseio.com/taskRecord/${editedTask.id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTask),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
      );
      setEditingTaskId(null);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `https://task-management-app-6e356-default-rtdb.firebaseio.com/taskRecord/${taskId}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center flex-col h-[100dvh] text-3xl font-bold">
          <p>...Loading</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center flex-col h-[100dvh] text-3xl font-bold">
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="font-bold text-xl px-10 py-5">
        <h1 className="text-2xl font-bold mb-4">Task List</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="w-full">
              {editingTaskId === task.id ? (
                <EditTask
                  task={task}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
                  <CardHeader>
                    <CardTitle>Title: {task.title}</CardTitle>
                    <CardDescription>
                      Assigned to: {task.assignee}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Description: {task.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Created: {task.createdAt}
                    </p>
                    <div className="flex justify-between mt-2">
                      <Button
                        onClick={() => handleEditClick(task.id)}
                        variant="outline"
                        className="bg-black text-white text-lg hover:bg-green-600 hover:text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteTask(task.id)}
                        variant="destructive"
                        className="text-white text-lg"
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
