import React from "react";

interface StageBadgeProps {
  stage: string;
  className?: string;
}

export const StageBadge = ({ stage, className = "" }: StageBadgeProps) => {
  const getStageColor = () => {
    switch (stage) {
      case "lead":
        return "bg-gray-100 text-gray-800";
      case "qualified":
        return "bg-blue-100 text-blue-800";
      case "proposal":
        return "bg-yellow-100 text-yellow-800";
      case "negotiation":
        return "bg-orange-100 text-orange-800";
      case "closed-won":
        return "bg-green-100 text-green-800";
      case "closed-lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStageColor()} ${className}`}
    >
      {stage.charAt(0).toUpperCase() + stage.slice(1).replace("-", " ")}
    </span>
  );
};
