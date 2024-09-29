import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
import { Card, CardDescription, CardHeader } from "~/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useLogStore } from "./state";
import { api } from "~/trpc/react";
import { format, subDays } from "date-fns";
import { Button } from "~/components/ui/button";

const chartConfig = {
  moodRatings: {
    label: "Mood Ratings",
    color: "hsl(var(--chart-1))",
  },
  anxietyLevels: {
    label: "Anxiety Levels",
    color: "hsl(var(--chart-2))",
  },
  stressLevels: {
    label: "Stress Levels",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const LogChart = () => {
  const { chartDuration, setChartDuration, date } = useLogStore(
    (state) => state,
  );
  const queryGetLogByDate = api.log.getLogsByDate.useQuery({
    startDate: subDays(date ?? new Date(), chartDuration),
    endDate: date ?? new Date(),
  });

  const chartData = queryGetLogByDate.data?.map(
    ({ createdAt, moodRatings, anxietyLevels, stressLevels }) => ({
      createdAt: format(createdAt, "dd-MM"),
      moodRatings,
      anxietyLevels,
      stressLevels,
    }),
  );

  console.log(queryGetLogByDate.data);
  return (
    <Card>
      <CardHeader>
        <Tabs
          defaultValue="7"
          value={chartDuration.toString()}
          className="w-full"
          onValueChange={(value) => setChartDuration(parseInt(value))}
        >
          <TabsList>
            <Button variant={"ghost"} disabled className="text-foreground">
              {`${format(subDays(date ?? new Date(), chartDuration), "MMM dd yyyy")} to ${format(date ?? new Date(), "MMM dd yyyy")}`}
            </Button>
            <TabsTrigger value="7">Past week</TabsTrigger>
            <TabsTrigger value="30">Past month</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardDescription>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="moodRatings"
              fill="var(--color-moodRatings)"
              radius={4}
            />
            <Bar
              dataKey="anxietyLevels"
              fill="var(--color-anxietyLevels)"
              radius={4}
            />
            <Bar
              dataKey="stressLevels"
              fill="var(--color-stressLevels)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardDescription>
    </Card>
  );
};

export default LogChart;
