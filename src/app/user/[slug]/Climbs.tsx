import type { Climb, DeleteClimbProps, RawClimb } from "@/lib/types";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export const Climbs = ({
  climbs,
  username,
}: {
  climbs: Climb[];
  username: string;
}) => {
  const numRemaining = 100 - climbs.length;
  const vPoints = climbs.reduce((acc, curr) => acc + curr.grade, 0);
  const message =
    numRemaining > 0
      ? `${numRemaining} climbs remain!`
      : "You did it! Congratulations!";

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (props: DeleteClimbProps): Promise<RawClimb> =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/climbs/${username}`,
        { method: "DELETE", body: JSON.stringify(props) }
      ).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [username, "climbs"],
      });
      toast({
        description: "Climb deleted.",
      });
    },
  });

  return (
    <div>
      <p className="text-center font-bold text-2xl">{message}</p>
      <p className="text-center font-bold text-xl mb-10">
        Total V-Points: {vPoints}
      </p>
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {climbs.map((climb) => (
              <TableRow key={climb.id}>
                <TableCell>{climb.color}</TableCell>
                <TableCell className="text-center">V{climb.grade}</TableCell>
                <TableCell>{climb.zone}</TableCell>
                <TableCell>{climb.notes}</TableCell>
                <TableCell className="text-right">
                  {climb.createdAt.toLocaleTimeString()}
                </TableCell>
                <TableCell className="flex justify-center">
                  <Trash2
                    className="h-4 w-4 text-red-500 hover:cursor-pointer"
                    onClick={() => deleteMutation.mutate({ id: climb.id })}
                  />
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
