"use client";
import * as React from "react";
import { useState } from "react";
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (title && description && assignedTo) {
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
              title,
              description,
              assignee: assignedTo,
              createdAt,
            }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          console.log("Task created with ID:", data.name);
          setTitle("");
          setDescription("");
          setAssignedTo("");
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

  return (
    <div className="flex items-center justify-center h-[100dvh]">
      <Card className="w-[350px]">
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of your task"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Assigned to</Label>
                <Input
                  id="name"
                  placeholder="Whom to assign"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  required
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4 p-0">
              <Button type="button" variant="outline">
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
