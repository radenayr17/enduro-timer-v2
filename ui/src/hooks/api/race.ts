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

export interface Racer {
  id: string;
  number: string;
  firstName: string;
  lastName: string;
  category: RaceCategory;
}

interface Racers {
  data: Racer[];
  count: number;
}

interface RacerQuery {
  categoryId?: string;
}

const RACE_BASE_URL = "/races";
const RACE_CATEGORY_PATH = "categories";
const RACE_STAGE_PATH = "stages";
const RACER_PATH = "racers";

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

const deleteCategory = async ({ id, subId }: { id: Race["id"]; subId: RaceCategory["id"] }) => {
  const { data } = await api.delete<unknown, unknown>(`${RACE_BASE_URL}/${id}/${RACE_CATEGORY_PATH}/${subId}`);

  return data;
};

export function useDeleteCategory() {
  return useMutation(deleteCategory);
}

const createCategory = async ({ id, body }: { id: RaceCategory["id"]; body: Omit<RaceCategory, "id" | "key"> }) => {
  const { data } = await api.post<unknown, Race>(`${RACE_BASE_URL}/${id}/${RACE_CATEGORY_PATH}`, body);

  return data;
};

export function useCreateCategory() {
  return useMutation(createCategory);
}

const deleteStage = async ({ id, subId }: { id: Race["id"]; subId: RaceStage["id"] }) => {
  const { data } = await api.delete<unknown, unknown>(`${RACE_BASE_URL}/${id}/${RACE_STAGE_PATH}/${subId}`);

  return data;
};

export function useDeleteStage() {
  return useMutation(deleteStage);
}

const createStage = async ({ id, body }: { id: RaceStage["id"]; body: Omit<RaceStage, "id" | "key"> }) => {
  const { data } = await api.post<unknown, Race>(`${RACE_BASE_URL}/${id}/${RACE_STAGE_PATH}`, body);

  return data;
};

export function useCreateStage() {
  return useMutation(createStage);
}

const getRacers = async ({ id }: { id: Race["id"] }) => {
  const { data } = await api.get<unknown, Racers>(`${RACE_BASE_URL}/${id}/${RACER_PATH}`);

  return data;
};

export function useGetRacers({ id }: { id: Race["id"] }) {
  return useQuery([RaceApiHooks.getRacers], () => getRacers({ id }));
}
