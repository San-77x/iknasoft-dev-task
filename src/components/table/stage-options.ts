import { DropdownOption } from "../ui/dropdown";

// Stage options for dropdown selection
export const stageOptions: DropdownOption[] = [
  {
    value: "lead",
    label: "Lead",
    color: "#6b7280", // gray-500
  },
  {
    value: "qualified",
    label: "Qualified",
    color: "#3b82f6", // blue-500
  },
  {
    value: "proposal",
    label: "Proposal",
    color: "#eab308", // yellow-500
  },
  {
    value: "negotiation",
    label: "Negotiation",
    color: "#f97316", // orange-500
  },
  {
    value: "closed-won",
    label: "Closed Won",
    color: "#22c55e", // green-500
  },
  {
    value: "closed-lost",
    label: "Closed Lost",
    color: "#ef4444", // red-500
  },
];

// Helper function to get stage option by value
export const getStageOption = (value: string): DropdownOption | undefined => {
  return stageOptions.find(option => option.value === value);
};

// Helper function to get stage label by value
export const getStageLabel = (value: string): string => {
  const option = getStageOption(value);
  return option ? option.label : value.charAt(0).toUpperCase() + value.slice(1).replace("-", " ");
};

// Helper function to get stage color by value
export const getStageColor = (value: string): string | undefined => {
  const option = getStageOption(value);
  return option?.color;
};
