import { useQueryClient } from "react-query";

import { Race } from "@/hooks/api/race";
import { RaceApiHooks } from "@/constants/hooks";

import { RaceForm } from "../form";

interface Props {
  data: Race;
}

const Details = ({ data: { id, name, description, from, to } }: Props) => {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries(RaceApiHooks.getRaces);
    queryClient.invalidateQueries(RaceApiHooks.getRace);
  };

  return <RaceForm initialData={{ name, description, from, to }} id={id} onSuccess={handleSuccess} />;
};

export default Details;
