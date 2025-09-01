# Editable Table Components

This directory contains reusable table components with inline editing capabilities, including both text-based editing and dropdown selection.

## Components

### 1. EditableCell

A versatile editable cell component that supports different input types.

**Features:**
- Text, number, and date editing
- Custom display formatting
- Keyboard shortcuts (Enter to save, Escape to cancel)
- Auto-focus when editing starts

**Usage:**
```tsx
import { EditableCell } from "./table/editable-cell";

// Text cell
cell: (props) => <EditableCell {...props} />

// Number cell with formatting
cell: (props) => (
  <EditableCell
    {...props}
    type="number"
    displayFormat={(value) => `$${(value as number).toLocaleString()}`}
  />
)

// Date cell with formatting
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
)
```

### 2. DropdownEditableCell

An editable cell component specifically designed for dropdown selection with options.

**Features:**
- Dropdown selection with search
- Color indicators for options
- Keyboard navigation (Arrow keys, Enter, Escape)
- Custom display formatting
- Integration with existing badge components

**Usage:**
```tsx
import { DropdownEditableCell } from "./table/dropdown-editable-cell";
import { stageOptions } from "./table/stage-options";

// Stage dropdown
cell: (props) => <DropdownEditableCell {...props} options={stageOptions} />

// Custom dropdown options
const priorityOptions = [
  { value: "low", label: "Low", color: "#10b981" },
  { value: "medium", label: "Medium", color: "#f59e0b" },
  { value: "high", label: "High", color: "#ef4444" },
];

cell: (props) => <DropdownEditableCell {...props} options={priorityOptions} />
```

### 3. Dropdown UI Component

A standalone dropdown component used by DropdownEditableCell.

**Features:**
- Click-outside to close
- Keyboard navigation
- Color indicators
- Accessible ARIA attributes

### 4. Stage Options

Predefined stage options that match the existing StageBadge component.

**Available stages:**
- Lead (Gray)
- Qualified (Blue)
- Proposal (Yellow)
- Negotiation (Orange)
- Closed Won (Green)
- Closed Lost (Red)

## Table Meta Configuration

Both editable cell components require the table to have an `updateData` function in its meta:

```tsx
const table = useReactTable({
  data: tableData,
  columns,
  meta: {
    updateData: (rowIndex: number, columnId: string, value: unknown) => {
      // Update your data state here
      setTableData(old => 
        old.map((row, index) => 
          index === rowIndex ? { ...row, [columnId]: value } : row
        )
      );
    },
  },
  // ... other table options
});
```

## Complete Example

```tsx
import { ColumnDef } from "@tanstack/react-table";
import { 
  DataTable, 
  EditableCell, 
  DropdownEditableCell, 
  stageOptions 
} from "./table";

interface MyData {
  id: string;
  name: string;
  stage: string;
  budget: number;
  startDate: string;
}

const columns: ColumnDef<MyData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => <EditableCell {...props} />,
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: (props) => <DropdownEditableCell {...props} options={stageOptions} />,
  },
  {
    accessorKey: "budget",
    header: "Budget",
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
    header: "Start Date",
    cell: (props) => <EditableCell {...props} type="date" />,
  },
];

export function MyTable() {
  return (
    <DataTable
      columns={columns}
      data={myData}
      filterField="name"
      filterPlaceholder="Search by name..."
    />
  );
}
```

## Keyboard Shortcuts

### EditableCell
- **Click**: Start editing
- **Enter**: Save changes and exit edit mode
- **Escape**: Cancel changes and exit edit mode

### DropdownEditableCell
- **Click**: Open dropdown
- **Enter/Space**: Open dropdown (when focused)
- **Arrow Up/Down**: Navigate options (when dropdown is open)
- **Enter**: Select option and close dropdown
- **Escape**: Close dropdown without selecting

## Styling

All components use Tailwind CSS classes and follow the existing design system:
- Blue color scheme for focus states
- Gray hover states
- Consistent spacing and sizing
- Accessible focus indicators

## TypeScript Support

All components are fully typed with TypeScript:
- `TableMeta` interface for table metadata
- `DropdownOption` interface for dropdown options
- Generic support for different data types
- Proper prop types for all components

## Accessibility

- Proper ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- High contrast focus indicators
- Semantic HTML structure