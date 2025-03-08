"use client";
import { redirect, useParams } from "next/navigation";
import { Box, Card, CardContent, Stack, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";

import { ADMIN_RACE_PATH, RACE_TABS } from "@/constants";
import { useGetRace } from "@/hooks/api/race";
import Loader from "@/components/loader";

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

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">{data.name}</Typography>
      </Stack>
      <Card>
        <CardContent>
          <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="fullWidth">
            {RACE_TABS.map((tab) => (
              <Tab label={tab.label} id={`race-tab-${tab.value}`} key={tab.value} value={tab.value} />
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RacePage;
