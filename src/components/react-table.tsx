"use client";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface DealNode {
  id: number;
  dealName: string;
  stage: string;
  owner: string;
  dealValue: number;
  date: string;
  closeProbability: number;
}

interface Column {
  key: keyof DealNode;
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

  const [columns] = useState<Column[]>([
    { key: "id", label: "ID", sortKey: "ID" },
    { key: "dealName", label: "Deal Name", sortKey: "DEAL_NAME" },
    { key: "stage", label: "Stage", sortKey: "STAGE" },
    { key: "owner", label: "Owner", sortKey: "OWNER" },
    { key: "dealValue", label: "Deal Value", sortKey: "DEAL_VALUE" },
    { key: "date", label: "Date", sortKey: "DATE" },
    {
      key: "closeProbability",
      label: "Close Probability",
      sortKey: "CLOSE_PROBABILITY",
    },
  ]);

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
          (array as DealNode[]).sort((a, b) => a.id - b.id),
        DEAL_NAME: (array: unknown) =>
          (array as DealNode[]).sort((a, b) =>
            a.dealName.localeCompare(b.dealName),
          ),
        STAGE: (array: unknown) =>
          (array as DealNode[]).sort((a, b) => a.stage.localeCompare(b.stage)),
        OWNER: (array: unknown) =>
          (array as DealNode[]).sort((a, b) => a.owner.localeCompare(b.owner)),
        DEAL_VALUE: (array: unknown) =>
          (array as DealNode[]).sort((a, b) => a.dealValue - b.dealValue),
        DATE: (array: unknown) =>
          (array as DealNode[]).sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          ),
        CLOSE_PROBABILITY: (array: unknown) =>
          (array as DealNode[]).sort(
            (a, b) => a.closeProbability - b.closeProbability,
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

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "discovery":
        return "bg-purple-100 text-purple-800";
      case "proposal":
        return "bg-yellow-100 text-yellow-800";
      case "negotiation":
        return "bg-orange-100 text-orange-800";
      case "won":
        return "bg-green-100 text-green-800";
      case "lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderCellContent = (item: DealNode, columnKey: keyof DealNode) => {
    switch (columnKey) {
      case "stage":
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(item.stage)}`}
          >
            {item.stage.charAt(0).toUpperCase() + item.stage.slice(1)}
          </span>
        );
      case "dealValue":
        return (
          <span className="font-medium">{formatCurrency(item.dealValue)}</span>
        );
      case "date":
        return formatDate(item.date);
      case "closeProbability":
        return (
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${item.closeProbability}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">
              {item.closeProbability}%
            </span>
          </div>
        );
      default:
        return item[columnKey];
    }
  };

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
            <Badge>{data.nodes.length}</Badge>
          </div>
        </div>
        <div className="h-146 rounded-b-2xl overflow-x-auto overflow-y-auto">
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
            {(tableList: DealNode[]) => (
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
                  {tableList.map((item: DealNode) => (
                    <Row key={item.id} item={item}>
                      {columns.map((column) => (
                        <Cell key={column.key}>
                          {renderCellContent(item, column.key)}
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
