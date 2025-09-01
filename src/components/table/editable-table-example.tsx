"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { EditableCell } from "./editable-cell";
import { DropdownEditableCell } from "./dropdown-editable-cell";
import { DataTableColumnHeader } from "./data-table-column-header";
import { stageOptions } from "./stage-options";

// Example data type
interface ExampleData {
  id: string;
  name: string;
  email: string;
  stage: string;
  priority: string;
  budget: number;
  startDate: string;
}

// Priority options for dropdown
const priorityOptions = [
  { value: "low", label: "Low", color: "#10b981" },
  { value: "medium", label: "Medium", color: "#f59e0b" },
  { value: "high", label: "High", color: "#ef4444" },
  { value: "urgent", label: "Urgent", color: "#dc2626" },
];

// Example data
const exampleData: ExampleData[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    stage: "lead",
    priority: "high",
    budget: 50000,
    startDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    stage: "qualified",
    priority: "medium",
    budget: 75000,
    startDate: "2024-02-01",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    stage: "proposal",
    priority: "low",
    budget: 25000,
    startDate: "2024-01-20",
  },
];

// Column definitions
const columns: ColumnDef<ExampleData>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ getValue }) => (
      <div className="font-medium text-gray-900">#{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: (props) => <EditableCell {...props} />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: (props) => <EditableCell {...props} />,
  },
  {
    accessorKey: "stage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: (props) => <DropdownEditableCell {...props} options={stageOptions} />,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: (props) => <DropdownEditableCell {...props} options={priorityOptions} />,
  },
  {
    accessorKey: "budget",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Budget" />
    ),
    cell: (props) => (
      <EditableCell
        {...props}
        type="number"
        displayFormat={(value) => `$${(value as number).toLocaleString()}`}
      />
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: (props) => (
      <EditableCell
        {...props}
        type="date"
        displayFormat={(value) => {
          const date = new Date(value as string);
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }}
      />
    ),
  },
];

export function EditableTableExample() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Editable Table Example
        </h1>
        <p className="text-gray-600">
          This example demonstrates both regular editable cells and dropdown editable cells.
          Click any cell to edit it. Use Enter to save, Escape to cancel.
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Features demonstrated:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Text editing (Name, Email)</li>
            <li>• Dropdown selection (Stage, Priority)</li>
            <li>• Number editing with formatting (Budget)</li>
            <li>• Date editing with formatting (Start Date)</li>
          </ul>
        </div>
      </div>

      <DataTable
        filterPlaceholder="Search by name..."
        filterField="name"
        defaultSort={{
          id: "id",
          desc: false,
        }}
        columns={columns}
        data={exampleData}
        isLoading={false}
        pageSize={10}
      />
    </div>
  );
}
