"use client";

import React, { HTMLProps } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./table/data-table-column-header";
import { DealData, generateDemoData } from "./table/demo-data";
import { StageBadge } from "./ui/stage-badge";
import { DataTable } from "./table/data-table";

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

const columns: ColumnDef<DealData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ getValue }) => (
      <div className="font-medium text-gray-900">#DL{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "dealName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deal Name" />
    ),
    cell: ({ getValue }) => (
      <div className="font-medium text-gray-900 max-w-xs truncate">
        {getValue() as string}
      </div>
    ),
  },
  {
    accessorKey: "stage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stage" />
    ),
    cell: ({ getValue }) => <StageBadge stage={getValue() as string} />,
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ getValue }) => (
      <div className="text-gray-900">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "dealValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deal Value" />
    ),
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return (
        <div className="font-medium text-gray-900">
          ${value.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return (
        <div className="text-gray-600">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "closeProbability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Close Probability" />
    ),
    cell: ({ getValue }) => {
      const probability = getValue() as number;
      const color =
        probability >= 80
          ? "text-green-600"
          : probability >= 50
            ? "text-yellow-600"
            : "text-red-600";
      return <div className={`font-medium ${color}`}>{probability}%</div>;
    },
  },
];

export function ReactTable() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Deals Dashboard
        </h1>
        <p className="text-gray-600">
          Manage and track your sales deals with advanced filtering and sorting.
        </p>
      </div>

      <DataTable
        filterPlaceholder="Search deals..."
        filterField="dealName"
        defaultSort={{
          id: "id",
          desc: false,
        }}
        columns={columns}
        data={generateDemoData(100)}
        isLoading={false}
        pageSize={10}
      />
    </div>
  );
}
