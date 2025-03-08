"use client";
import { redirect, useParams } from "next/navigation";
import { Box, Card, CardContent, Stack, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";

import { ADMIN_RACE_PATH, RACE_TABS } from "@/constants";
import { useGetRace } from "@/hooks/api/race";
import Loader from "@/components/loader";
import { TabPanel } from "@/components/tabs";
import BreadCrumbs, { BreadCrumbsProps } from "@/components/breadcrumbs";

import DetailsTab from "./details";

const RacePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetRace(id);
  const [tab, setTab] = useState<string>(RACE_TABS[0].value);

  if (!data) {
    if (isLoading) {
      return <Loader />;
    } else {
      return redirect(ADMIN_RACE_PATH);
    }
  }

  const breadcrumbs: BreadCrumbsProps = [{ label: "Race", link: ADMIN_RACE_PATH }, { label: data.name }];

  return (
    <Box>
      <Stack mb={2} spacing={2}>
        <Typography variant="h4">{data.name}</Typography>
        <BreadCrumbs data={breadcrumbs} />
      </Stack>
      <Card>
        <CardContent>
          <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="fullWidth">
            {RACE_TABS.map((tab) => (
              <Tab label={tab.label} id={`race-tab-${tab.value}`} key={tab.value} value={tab.value} />
            ))}
          </Tabs>
          <TabPanel value={tab} index="details">
            <DetailsTab data={data} />
          </TabPanel>
          <TabPanel value={tab} index="categories">
            categories
          </TabPanel>
          <TabPanel value={tab} index="stages">
            stages
          </TabPanel>
          <TabPanel value={tab} index="racers">
            racers
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RacePage;
