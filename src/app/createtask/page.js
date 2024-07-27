"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function CreateTask() {
  const [isLoading, setIsLoading] = useState(false);

  const [taskList, setTaskList] = useState({
    title: "",
    description: "",
    assignedTo: "",
    taskStatus: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      taskList.title &&
      taskList.description &&
      taskList.assignedTo &&
      taskList.taskStatus
    ) {
      try {
        const now = new Date();
        const createdAt = `${now.toDateString()} ${now.toLocaleTimeString()}`;
        const res = await fetch(
          "https://task-management-app-6e356-default-rtdb.firebaseio.com/taskRecord.json",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              createdAt,
              title: taskList.title,
              assignee: taskList.assignedTo,
              description: taskList.description,
              taskStatus: taskList.taskStatus,
            }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          console.log("Task created with ID:", data.name);
          router.push("/home");
        } else {
          throw new Error("Failed to create task");
        }
      } catch (error) {
        alert("Error creating task. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please fill all fields");
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    router.push("/home");
  };

  useEffect(() => {
    const user = localStorage.getItem("userEmail");
    if (!user) router.push("/");
    if (user) router.push("/createtask");
  }, []);

  return (
    <div className="flex items-center justify-center h-[100dvh]">
      <Card className="skeleton w-[350px]">
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
          <CardDescription>Deploy your new Task in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Title of your task"
                  value={taskList.title}
                  onChange={(e) =>
                    setTaskList((prev) => {
                      return {
                        ...prev,
                        title: e.target.value,
                      };
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of your task"
                  value={taskList.description}
                  onChange={(e) =>
                    setTaskList((prev) => {
                      return {
                        ...prev,
                        description: e.target.value,
                      };
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Assigned to</Label>
                <Input
                  id="name"
                  placeholder="Whom to assign"
                  value={taskList.assignedTo}
                  onChange={(e) =>
                    setTaskList((prev) => {
                      return {
                        ...prev,
                        assignedTo: e.target.value,
                      };
                    })
                  }
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="select">Task Status</Label>
                <select
                  className="dark:bg-gray-900 dark:text-white"
                  id="select"
                  value={taskList.taskStatus}
                  onChange={(e) => {
                    console.log(e);
                    setTaskList((prev) => {
                      return {
                        ...prev,
                        taskStatus: e.target.value,
                      };
                    });
                  }}
                >
                  <option>Select Option</option>
                  <option>To do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4 p-0">
              <Button onClick={handleClick} type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
