import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table"; // Import Column type

interface ButtonGhostProps<TData, TValue> {
  column: Column<TData, TValue>;
  label: string;
}

export const ButtonGhost = <TData, TValue>({
  column,
  label,
}: ButtonGhostProps<TData, TValue>) => {
  const toggleSort = () => column.toggleSorting(column.getIsSorted() === "asc");

  return (
    <Button variant="ghost" onClick={toggleSort}>
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};