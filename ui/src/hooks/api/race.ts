import { useMutation, useQuery } from "react-query";

import { RaceApiHooks } from "@/constants/hooks";
import { api } from "@/services/api";

interface Race {
  id: string;
  name: string;
  description: string;
  from: string;
  to: string;
}

interface Races {
  data: Race[];
  count: number;
}

const RACE_BASE_URL = "/races";

const getRaces = async () => {
  const { data } = await api.get<unknown, Races>(RACE_BASE_URL);

  return data;
};

export function useGetRaces() {
  return useQuery([RaceApiHooks.getRaces], () => getRaces());
}

const createRace = async (body: Omit<Race, "id">) => {
  const { data } = await api.post<unknown, Race>(RACE_BASE_URL, body);

  return data;
};

export function useCreateRace() {
  return useMutation(createRace);
}
