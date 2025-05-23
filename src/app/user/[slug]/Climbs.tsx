import type { Climb } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Climbs = ({ climbs }: { climbs: Climb[] }) => {
  const numRemaining = 100 - climbs.length;
  const message =
    numRemaining > 0 ? `${numRemaining} climbs remain!` : "You did it! Congratulations!";

  return (
    <div>
      <p className="text-center font-bold text-xl">{message}</p>
      <div className="flex items-center">
        <Table className="max-w-[500px]">
          <TableCaption>Your Completed Climbs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Color</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Zone</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {climbs.map((climb) => (
              <TableRow key={climb.id}>
                <TableCell>{climb.color}</TableCell>
                <TableCell className="text-center">{climb.grade}</TableCell>
                <TableCell>{climb.zone}</TableCell>
                <TableCell>{climb.notes}</TableCell>
                <TableCell className="text-right">
                  {climb.createdAt.toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const ClimbsLoader = () => {
  return <p>Loading your climbs...</p>;
};
