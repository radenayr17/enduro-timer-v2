import { useMutation, useQuery } from "react-query";

import { StageApiHooks } from "@/constants/hooks";
import { api } from "@/services/api";

import { RaceStage, RACE_STAGE_PATH } from "./race";

export interface Stage extends RaceStage {
  raceId: string;
  race: {
    name: string;
    from: string;
    to: string;
  };
  _count: {
    RaceRecord: number;
  };
}

interface Stages {
  data: Stage[];
  count: number;
}

interface StageRecord {
  id: string;
  time: string;
  stageId: string;
  racerId: string;
  race: {
    name: string;
  };
  stage: {
    name: string;
  };
  racer: {
    id: string;
    number: string;
    firstName: string;
    lastName: string;
  };
}

interface StageRecordMutation {
  id: Stage["id"];
  body: {
    time: string;
  };
}

interface AssignStageRecordMutation {
  id: Stage["id"];
  recordId: StageRecord["id"];
  body: {
    racerId: StageRecord["racerId"];
  };
}

const STAGE_BASE_URL = `/${RACE_STAGE_PATH}`;
const STAGE_RECORD_PATH = "records";

const getStages = async () => {
  const { data } = await api.get<unknown, Stages>(STAGE_BASE_URL);

  return data;
};

export function useGetStages() {
  return useQuery([StageApiHooks.getStages], () => getStages());
}

const getStage = async (id: Stage["id"]) => {
  const { data } = await api.get<unknown, Stage>(`${STAGE_BASE_URL}/${id}`);

  return data;
};

export function useGetStage(id: Stage["id"]) {
  return useQuery([StageApiHooks.getStage], () => getStage(id));
}

const getStageRecords = async (id: Stage["id"]) => {
  const { data } = await api.get<unknown, StageRecord[]>(`${STAGE_BASE_URL}/${id}/${STAGE_RECORD_PATH}`);

  return data;
};

export function useGetStageRecords(id: Stage["id"]) {
  return useQuery([StageApiHooks.getStageRecords], () => getStageRecords(id));
}

const createStageRecord = async ({ id, body }: StageRecordMutation) => {
  const { data } = await api.post<unknown, StageRecord>(`${STAGE_BASE_URL}/${id}/${STAGE_RECORD_PATH}`, body);

  return data;
};

export const useCreateStageRecord = () => {
  return useMutation(createStageRecord);
};

const deleteStageRecord = async ({ id, subId }: { id: Stage["id"]; subId: StageRecord["id"] }) => {
  const { data } = await api.delete(`${STAGE_BASE_URL}/${id}/${STAGE_RECORD_PATH}/${subId}`);

  return data;
};

export const useDeleteStageRecord = () => {
  return useMutation(deleteStageRecord);
};

const assignStageRecord = async ({ id, recordId, body }: AssignStageRecordMutation) => {
  const { data } = await api.post<unknown, StageRecord>(
    `${STAGE_BASE_URL}/${id}/${STAGE_RECORD_PATH}/${recordId}/assign`,
    body
  );

  return data;
};

export const useAssignStageRecord = () => {
  return useMutation(assignStageRecord);
};
