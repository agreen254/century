"use client";

import useGetAllClimbs from "@/hooks/useGetAllClimbs";
import { useParams } from "next/navigation";
import { Climbs, ClimbsLoader } from "./Climbs";
import AddClimb from "./AddClimb";

const UsersPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const climbs = useGetAllClimbs(slug);

  return (
    <div>
      <p className="text-gray-500 text-center mt-4">Climbing as {slug}</p>
      <div className="flex justify-center mb-12">
        <AddClimb username={slug} />
      </div>
      <div className="flex w-full justify-center">
        {climbs.isLoading && <ClimbsLoader />}
        {climbs.data && <Climbs climbs={climbs.data} username={slug} />}
      </div>
    </div>
  );
};

export default UsersPage;
