"use client";
import { Box, Stack, Tab, Typography } from "@mui/material";
import { redirect, useParams } from "next/navigation";

import BreadCrumbs, { BreadCrumbsProps } from "@/components/breadcrumbs";
import Loader from "@/components/loader";
import { ADMIN_EVENT_PATH } from "@/constants";
import { useGetStage } from "@/hooks/api/stage";
import { useGetRacers, Racer } from "@/hooks/api/race";

import Table from "./table";
import { useEffect } from "react";

const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetStage(id);

  const raceId = data?.raceId || null;

  const { data: racers, refetch } = useGetRacers({ id: raceId, enabled: true });
  const racerData = racers?.data ?? [];

  useEffect(() => {
    if (raceId) refetch();
  }, [raceId]);

  if (!data) {
    if (isLoading) {
      return <Loader />;
    } else {
      return redirect(ADMIN_EVENT_PATH);
    }
  }

  const { race, name } = data;
  const title = `${name} - ${race.name}`;
  const breadcrumbs: BreadCrumbsProps = [{ label: "Event", link: ADMIN_EVENT_PATH }, { label: title }];

  return (
    <Box>
      <Stack mb={2} spacing={2}>
        <Typography variant="h4">{title}</Typography>
        <BreadCrumbs data={breadcrumbs} />
      </Stack>
      <Table id={id} racers={racerData} />
    </Box>
  );
};

export default EventPage;
