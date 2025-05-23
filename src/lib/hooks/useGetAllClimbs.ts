import type { Climb, RawClimb } from "../types";
import { useQuery } from "@tanstack/react-query";

const useGetAllClimbs = (username: string) =>
  useQuery({
    queryKey: [username, "climbs"],
    queryFn: async (): Promise<Climb[]> =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/climbs/${username}`,
        { method: "GET" }
      )
        .then<RawClimb[]>((res) => res.json())
        .then((res) =>
          res.map((climb) => ({
            ...climb,
            createdAt: new Date(climb.created_at),
            updatedAt: new Date(climb.updated_at),
          }))
        ),
  });

export default useGetAllClimbs;
