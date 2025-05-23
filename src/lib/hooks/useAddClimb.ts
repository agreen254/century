import { useQuery } from "@tanstack/react-query";
import { AddClimbProps, RawClimb } from "../types";

const useAddClimb = (props: AddClimbProps) =>
  useQuery({
    queryKey: [props.user_id, props.color, props.grade, props.zone],
    queryFn: async (): Promise<RawClimb> =>
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/climbs/${props.user_id}`,
        { method: "POST", body: JSON.stringify(props) }
      ).then((res) => res.json()),
  });
