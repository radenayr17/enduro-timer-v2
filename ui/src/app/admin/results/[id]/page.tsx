"use client";
import { Box, Card, CardContent, Stack, Typography, Tabs, Tab } from "@mui/material";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import BreadCrumbs, { BreadCrumbsProps } from "@/components/breadcrumbs";
import Loader from "@/components/loader";
import { ADMIN_RESULT_PATH } from "@/constants";
import { useGetRace } from "@/hooks/api/race";
import { TabPanel } from "@/components/tabs";

import CategoryTab from "./tab";

const ResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetRace(id);

  const categories = data?.RaceCategory ?? [];
  const stages = data?.RaceStage ?? [];
  const [tab, setTab] = useState<string>("");

  useEffect(() => {
    if (!tab && categories.length) setTab(categories[0].id);
  }, [data, categories]);

  if (!data) {
    if (isLoading) {
      return <Loader />;
    } else {
      return redirect(ADMIN_RESULT_PATH);
    }
  }

  const breadcrumbs: BreadCrumbsProps = [{ label: "Result", link: ADMIN_RESULT_PATH }, { label: data.name }];

  return (
    <Box>
      <Stack mb={2} spacing={2}>
        <Typography variant="h4">{data.name}</Typography>
        <BreadCrumbs data={breadcrumbs} />
      </Stack>
      <Card>
        <CardContent>
          <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="fullWidth">
            {categories.map((category) => (
              <Tab label={category.name} id={`category-tab-${category.id}`} key={category.id} value={category.id} />
            ))}
          </Tabs>
          {categories.map((category) => (
            <TabPanel value={tab} index={category.id} key={`category-tab-panel-${category.id}`}>
              <CategoryTab raceId={id} categoryId={category.id} stages={stages} />
            </TabPanel>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResultPage;
