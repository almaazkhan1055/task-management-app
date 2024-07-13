"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditTask({ task, onSave, onCancel }) {
  const [editedTask, setEditedTask] = useState(task);

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
      <textarea
        name="description"
        value={editedTask.description}
        onChange={handleChange}
        placeholder="Description"
        className="mb-2"
      />
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
