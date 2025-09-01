"use client";

import React from "react";
import { CellContext } from "@tanstack/react-table";

export type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
};

// Editable cell component that can use React hooks
export const EditableCell = <TData,>({
  getValue,
  row: { index },
  column: { id },
  table,
  type = "text",
  displayFormat,
  ...props
}: CellContext<TData, unknown> & {
  type?: "text" | "number" | "date";
  displayFormat?: (value: unknown) => string;
}) => {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);
  const [isEditing, setIsEditing] = React.useState(false);
  const [originalValue, setOriginalValue] = React.useState(initialValue);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    if (isEditing) {
      (table.options.meta as TableMeta)?.updateData(index, id, value);
      setIsEditing(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (table.options.meta as TableMeta)?.updateData(index, id, value);
      setIsEditing(false);
      (e.target as HTMLInputElement).blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setValue(originalValue);
      setIsEditing(false);
      (e.target as HTMLInputElement).blur();
    }
  };

  const onFocus = () => {
    setIsEditing(true);
    setOriginalValue(value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
    setOriginalValue(initialValue);
  }, [initialValue]);

  // Format value for different types
  const formatValue = (val: unknown): string => {
    if (displayFormat) {
      return displayFormat(val);
    }

    switch (type) {
      case "number":
        return val?.toString() || "0";
      case "date":
        if (val instanceof Date) {
          return val.toISOString().split("T")[0];
        }
        if (typeof val === "string") {
          return new Date(val).toISOString().split("T")[0];
        }
        return "";
      default:
        return val?.toString() || "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    switch (type) {
      case "number":
        setValue(newValue === "" ? 0 : parseFloat(newValue) || 0);
        break;
      case "date":
        setValue(newValue);
        break;
      default:
        setValue(newValue);
    }
  };

  if (isEditing) {
    return (
      <input
        type={type}
        value={formatValue(value)}
        onChange={handleChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        autoFocus
        className="w-full px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded min-h-[32px] flex items-center"
      title="Click to edit (Enter to save, Esc to cancel)"
    >
      {displayFormat ? displayFormat(value) : formatValue(value)}
    </div>
  );
};
