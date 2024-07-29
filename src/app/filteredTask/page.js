"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/navBar";
import EditTask from "../../components/ui/editTask";

const FilteredTask = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const searchParams = useSearchParams();
  const assignee = searchParams.get("assignee");

  useEffect(() => {
    fetchFilteredTasks();
  }, [assignee]);

  const fetchFilteredTasks = async () => {
    if (!assignee) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://task-management-app-6e356-default-rtdb.firebaseio.com/taskRecord.json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      const tasksArray = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((task) => task.assignee === assignee);

      setFilteredTasks(tasksArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again.");
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

      setFilteredTasks((prevTasks) =>
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

      setFilteredTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
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
          <div className="loader"></div>
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
      <h2 className="text-3xl m-5">Filtered tasks for {assignee}</h2>
      {filteredTasks.length === 0 ? (
        <p className="text-xl m-5">No tasks found for this assignee.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="w-full">
              {editingTaskId === task.id ? (
                <EditTask
                  task={task}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
                  <CardHeader className="capitalize">
                    <CardTitle>Title: {task.title}</CardTitle>
                    <CardDescription>
                      Assigned to: {task.assignee}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="capitalize">
                      <span>Description: {task.description}</span>
                      <br />
                      <span>Status: {task.taskStatus}</span>
                    </CardDescription>
                    <p className="text-sm text-gray-500 mt-2">
                      Created: {task.createdAt}
                    </p>
                    <div className="flex justify-between mt-2">
                      <Button
                        onClick={() => handleEditClick(task.id)}
                        variant="outline"
                        className="bg-black text-white text-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-600"
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
      )}
    </>
  );
};

export default FilteredTask;
