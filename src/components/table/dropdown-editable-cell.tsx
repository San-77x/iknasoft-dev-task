"use client";

import React from "react";
import { CellContext } from "@tanstack/react-table";
import { Dropdown, DropdownOption } from "../ui/dropdown";
import { StageBadge } from "../ui/stage-badge";

export type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void;
};

// Dropdown editable cell component for stage selection
export const DropdownEditableCell = <TData,>({
  getValue,
  row: { index },
  column: { id },
  table,
  options,
  displayFormat,
  ...props
}: CellContext<TData, unknown> & {
  options: DropdownOption[];
  displayFormat?: (value: unknown) => string;
}) => {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);
  const [isEditing, setIsEditing] = React.useState(false);
  const [originalValue, setOriginalValue] = React.useState(initialValue);

  // Handle dropdown value change
  const handleChange = (newValue: string) => {
    setValue(newValue);
    (table.options.meta as TableMeta)?.updateData(index, id, newValue);
    setIsEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setValue(originalValue);
      setIsEditing(false);
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

  // Format value for display
  const formatValue = (val: unknown): React.ReactNode => {
    if (displayFormat) {
      return displayFormat(val);
    }

    // For stage values, use the StageBadge component
    if (id === "stage") {
      return <StageBadge stage={String(val)} />;
    }

    const option = options.find((opt) => opt.value === String(val));
    if (option) {
      return (
        <div className="flex items-center">
          {option.color && (
            <span
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: option.color }}
            />
          )}
          {option.label}
        </div>
      );
    }

    return String(val || "");
  };

  if (isEditing) {
    return (
      <div onKeyDown={onKeyDown}>
        <Dropdown
          options={options}
          value={String(value)}
          onChange={handleChange}
          placeholder={id === "stage" ? "Select stage" : "Select option"}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      onFocus={onFocus}
      tabIndex={0}
      className="cursor-pointer hover:bg-gray-50 px-2 py-1 rounded min-h-[32px] flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      title="Click to edit (Esc to cancel)"
    >
      {formatValue(value)}
    </div>
  );
};
