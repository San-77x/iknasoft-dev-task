"use client";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface UserNode {
  id: number;
  name: string;
  email: string;
  age: number;
  city: string;
  address: string;
  [key: string]: any;
}

interface Column {
  key: string;
  label: string;
  sortKey: string;
}

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";

import {
  useSort,
  HeaderCellSort,
  SortToggleType,
  SortIconPositions,
} from "@table-library/react-table-library/sort";
import { nodes } from "@/app/sample-data";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

const ReactTable = () => {
  const data = { nodes };

  const [columns, setColumns] = useState<Column[]>([
    { key: "id", label: "ID", sortKey: "ID" },
    { key: "name", label: "Name", sortKey: "NAME" },
    { key: "email", label: "Email", sortKey: "EMAIL" },
    { key: "age", label: "Age", sortKey: "AGE" },
    { key: "city", label: "City", sortKey: "CITY" },
    { key: "address", label: "Address", sortKey: "ADDRESS" },
  ]);

  const addNewColumn = () => {
    const newColumnNumber = columns.length + 1;
    const newColumn: Column = {
      key: `column${newColumnNumber}`,
      label: `Column ${newColumnNumber}`,
      sortKey: `COLUMN${newColumnNumber}`,
    };
    setColumns([...columns, newColumn]);
  };

  function onSortChange(action: unknown, state: unknown) {
    console.log(action, state);
  }

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },

    {
      sortToggleType: SortToggleType.AlternateWithReset,
      sortFns: {
        ID: (array: unknown) =>
          (array as UserNode[]).sort((a, b) => a.id - b.id),
        NAME: (array: unknown) =>
          (array as UserNode[]).sort((a, b) => a.name.localeCompare(b.name)),
        EMAIL: (array: unknown) =>
          (array as UserNode[]).sort((a, b) => a.email.localeCompare(b.email)),
        AGE: (array: unknown) =>
          (array as UserNode[]).sort((a, b) => a.age - b.age),
        CITY: (array: unknown) =>
          (array as UserNode[]).sort((a, b) => a.city.localeCompare(b.city)),
        ADDRESS: (array: unknown) =>
          (array as UserNode[]).sort((a, b) =>
            a.address.localeCompare(b.address),
          ),
      },

      sortIcon: {
        size: "16",
        margin: "4px",
        position: SortIconPositions.Prefix,
        iconDefault: <ChevronsUpDown />,
        iconUp: <ChevronUp />,
        iconDown: <ChevronDown />,
      },
    },
  );

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
      background-color: #f4f4fb;
      `,
      HeaderCell: `
      color: gray;
      font-weight: semibold;
      font-size: 14px;
      padding: 12px 24px;
      `,

      Row: `
        &:hover {
          background-color: #f9fafb;
          transition: background-color 0.2s ease-in-out;
        }
        padding: 12px 24px;
      `,
      Cell: `
        padding: 16px 24px;
        color: #364153;
        font-size: 14px;
      `,
      Table: `
      --data-table-library_grid-template-columns: ${columns.map(() => "minmax(200px, 1fr)").join(" ")};
      scrollbar-width: none;
      scrollbar-color: transparent transparent;
      `,
    },
  ]);

  return (
    <div className="mx-auto min-h-screen">
      <div className="my-6 bg-white border border-gray-200 rounded-2xl">
        <div className="flex justify-between items-center px-6 py-6">
          <div className="flex space-x-2 items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              User Details
            </h2>
            <Badge>100</Badge>
          </div>
          <button
            onClick={addNewColumn}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Column
          </button>
        </div>
        <div className="max-h-146 rounded-b-2xl overflow-x-auto overflow-y-auto">
          <Table
            layout={{
              fixedHeader: true,
              custom: true,
              horizontalScroll: true,
            }}
            data={data}
            theme={theme}
            sort={sort}
          >
            {(tableList: UserNode[]) => (
              <>
                <Header>
                  <HeaderRow>
                    {columns.map((column) => (
                      <HeaderCellSort
                        key={column.key}
                        resize
                        sortKey={column.sortKey}
                      >
                        {column.label}
                      </HeaderCellSort>
                    ))}
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList.map((item: UserNode) => (
                    <Row key={item.id} item={item}>
                      {columns.map((column) => (
                        <Cell key={column.key}>
                          {item[column.key] || `Sample ${column.label}`}
                        </Cell>
                      ))}
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ReactTable;
