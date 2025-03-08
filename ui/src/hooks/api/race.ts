import { useMutation, useQuery } from "react-query";

import { RaceApiHooks } from "@/constants/hooks";
import { api } from "@/services/api";

export interface RaceCategory {
  id: string;
  key: string;
  name: string;
}

export interface RaceStage extends RaceCategory {}

export interface Race {
  id: string;
  name: string;
  description: string;
  from: string;
  to: string;
  RaceCategory: RaceCategory[];
  RaceStage: RaceStage[];
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

const getRace = async (id: Race["id"]) => {
  const { data } = await api.get<unknown, Race>(`${RACE_BASE_URL}/${id}`);

  return data;
};

export function useGetRace(id: Race["id"]) {
  return useQuery([RaceApiHooks.getRace], () => getRace(id));
}

const createRace = async (body: Omit<Race, "id">) => {
  const { data } = await api.post<unknown, Race>(RACE_BASE_URL, body);

  return data;
};

export function useCreateRace() {
  return useMutation(createRace);
}

const updateRace = async ({ id, body }: { id: Race["id"]; body: Omit<Race, "id"> }) => {
  const { data } = await api.put<unknown, Race>(`${RACE_BASE_URL}/${id}`, body);

  return data;
};

export function useUpdateRace() {
  return useMutation(updateRace);
}

const deleteRace = async (id: Race["id"]) => {
  const { data } = await api.delete<unknown, unknown>(`${RACE_BASE_URL}/${id}`);

  return data;
};

export function useDeleteRace() {
  return useMutation(deleteRace);
}
