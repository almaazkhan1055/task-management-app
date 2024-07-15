"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditTask({ task, onSave, onCancel }) {
  const [editedTask, setEditedTask] = useState(task);
  console.log(editedTask);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="title"
        value={editedTask.title}
        onChange={handleChange}
        placeholder="Title"
        className="mb-2"
      />
      <Input
        name="assignee"
        value={editedTask.assignee}
        onChange={handleChange}
        placeholder="Assignee"
        className="mb-2"
      />
      <select
        id="select"
        name="taskStatus"
        value={editedTask.taskStatus}
        onChange={handleChange}
        className="mb-2 dark:bg-gray-950"
      >
        <option>To do</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <textarea
        name="description"
        value={editedTask.description}
        onChange={handleChange}
        placeholder="Description"
        className="mb-2 dark:bg-gray-950"
      />
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="dark:hover:bg-red-600 hover:bg-red-600"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="dark:hover:bg-green-600 hover:bg-green-600"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
