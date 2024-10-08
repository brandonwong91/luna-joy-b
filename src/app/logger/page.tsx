"use client";
import React from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { Calendar } from "~/components/ui/calendar";
import { useLogStore } from "./state";
import { api } from "~/trpc/react";
import LogChart from "./LogChart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";

const Home = () => {
  const router = useRouter();
  const {
    log,
    setLog,
    clearLog,
    date,
    setDate,
    physicalActivitiesInput,
    setPhysicalActivitiesInput,
    refreshQueryGetLogByDate,
  } = useLogStore((state) => state);

  const handleOnChangeLog = (
    field: string,
    value: number | string | boolean,
  ) => {
    const updatedLog = {
      ...log,
      [field]: value,
    };
    setLog(updatedLog);
  };

  const createLogApi = api.log.create.useMutation({
    onSuccess: async () => {
      router.refresh();
      toast(
        `Log created for ${format(date?.toString() ?? Date.now().toString(), "MMM-dd-yyyy")}`,
      );
      clearLog();
      if (refreshQueryGetLogByDate) {
        refreshQueryGetLogByDate();
      }
    },
  });

  const handleSaveLog = async () => {
    createLogApi.mutate({
      ...log,
      moodRatings: log.moodRatings ?? Infinity,
      anxietyLevels: log.anxietyLevels ?? Infinity,
      stressLevels: log.stressLevels ?? Infinity,
      createdAt: date ?? undefined,
    });
    clearLog();
  };

  const handlePhysicalActivityInputChange = (
    field: string,
    value: number | string,
  ) => {
    setPhysicalActivitiesInput({
      ...physicalActivitiesInput,
      [field]: value,
    });
  };

  const handleAddPhysicalActivity = () => {
    const updatedLog = {
      ...log,
      physicalActivities: [
        ...log.physicalActivities,
        {
          type: physicalActivitiesInput.type,
          duration: physicalActivitiesInput.duration,
        },
      ],
    };
    setLog(updatedLog);
    setPhysicalActivitiesInput({
      type: "",
      duration: 0,
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 pt-16 md:gap-8 md:p-10 md:pt-16">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-center text-2xl font-semibold md:text-3xl">{`Hello there, let's get logging!`}</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[240px_1fr] lg:grid-cols-[250px_1fr]">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-fit place-self-center rounded-md border"
            />
          </div>
          <div className="grid place-content-center gap-6">
            <LogChart />
            <Card x-chunk="dashboard-04-chunk-1" className="w-64 md:w-fit">
              <CardHeader>
                <CardTitle>Log entry</CardTitle>
                <CardDescription>
                  Let&#39;s note down how we&#39;re doing today.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-y-3 md:w-fit">
                  <div className="flex flex-col gap-0.5">
                    <Label className="flex">
                      Mood ratings
                      <p className="text-red-700">*</p>
                    </Label>
                    <div className="flex justify-start">
                      <ToggleGroup
                        type="single"
                        className="flex-wrap self-start"
                        onValueChange={(value) => {
                          if (value)
                            handleOnChangeLog("moodRatings", parseInt(value));
                        }}
                        value={log.moodRatings?.toString()}
                      >
                        <ToggleGroupItem
                          value="-2"
                          aria-label="Toggle very sad"
                        >
                          Very sad
                        </ToggleGroupItem>
                        <ToggleGroupItem value="-1" aria-label="Toggle sad">
                          Sad
                        </ToggleGroupItem>
                        <ToggleGroupItem value="0" aria-label="Toggle neutral">
                          Neutral
                        </ToggleGroupItem>
                        <ToggleGroupItem value="1" aria-label="Toggle happy">
                          Happy
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="2"
                          aria-label="Toggle very happy"
                        >
                          Very happy
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <Label className="flex">
                      Anxiety levels
                      <p className="text-red-700">*</p>
                    </Label>
                    <div className="flex justify-start">
                      <ToggleGroup
                        type="single"
                        className="flex-wrap self-start"
                        onValueChange={(value) => {
                          if (value)
                            handleOnChangeLog("anxietyLevels", parseInt(value));
                        }}
                        value={log.anxietyLevels?.toString()}
                      >
                        <ToggleGroupItem
                          value="-2"
                          aria-label="Toggle very anxious"
                        >
                          Very anxious
                        </ToggleGroupItem>
                        <ToggleGroupItem value="-1" aria-label="Toggle anxious">
                          Anxious
                        </ToggleGroupItem>
                        <ToggleGroupItem value="0" aria-label="Toggle neutral">
                          Neutral
                        </ToggleGroupItem>
                        <ToggleGroupItem value="1" aria-label="Toggle calm">
                          Calm
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="2"
                          aria-label="Toggle very calm"
                        >
                          Very calm
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <Label className="flex">
                        Stress levels
                        <p className="text-red-700">*</p>
                      </Label>
                      <ToggleGroup
                        type="single"
                        className="flex-wrap self-start"
                        onValueChange={(value) => {
                          if (value)
                            handleOnChangeLog("stressLevels", parseInt(value));
                        }}
                        value={log.stressLevels?.toString()}
                      >
                        <ToggleGroupItem
                          value="5"
                          aria-label="Toggle very Tired"
                        >
                          Very stressed
                        </ToggleGroupItem>
                        <ToggleGroupItem value="4" aria-label="Toggle Tired">
                          Stressed
                        </ToggleGroupItem>
                        <ToggleGroupItem value="3" aria-label="Toggle neutral">
                          Neutral
                        </ToggleGroupItem>
                        <ToggleGroupItem value="2" aria-label="Toggle rested">
                          Relaxed
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="1"
                          aria-label="Toggle very rested"
                        >
                          Very relaxed
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <Label className="text-md">Sleep patterns</Label>
                    <Label>Hours of sleep</Label>
                    <Input
                      placeholder="e.g. 8"
                      onChange={(e) => {
                        handleOnChangeLog(
                          "sleepHours",
                          parseInt(e.target.value),
                        );
                      }}
                    />
                    <Label>Quality of sleep</Label>
                    <ToggleGroup
                      onValueChange={(value) => {
                        if (value)
                          handleOnChangeLog("sleepQuality", parseInt(value));
                      }}
                      type="single"
                      className="flex-wrap self-start"
                    >
                      <ToggleGroupItem
                        value="-2"
                        aria-label="Toggle very Tired"
                      >
                        Very tired
                      </ToggleGroupItem>
                      <ToggleGroupItem value="-1" aria-label="Toggle Tired">
                        Tired
                      </ToggleGroupItem>
                      <ToggleGroupItem value="0" aria-label="Toggle neutral">
                        Neutral
                      </ToggleGroupItem>
                      <ToggleGroupItem value="1" aria-label="Toggle rested">
                        Rested
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="2"
                        aria-label="Toggle very rested"
                      >
                        Very rested
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <div className="flex items-center gap-x-2">
                      <Checkbox
                        checked={log.sleepDisturbances}
                        defaultChecked={log.sleepDisturbances}
                        onClick={() => {
                          handleOnChangeLog(
                            "sleepDisturbances",
                            !log.sleepDisturbances,
                          );
                        }}
                      />
                      <Label
                        className="cursor-pointer"
                        onClick={() => {
                          handleOnChangeLog(
                            "sleepDisturbances",
                            !log.sleepDisturbances,
                          );
                        }}
                      >
                        Sleep disturbances
                      </Label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <Label className="text-md">Physical activity</Label>
                    <div className="flex flex-row gap-4">
                      <div className="w-full">
                        <Label>Type</Label>
                        <Input
                          placeholder="e.g. Sports"
                          value={physicalActivitiesInput.type}
                          onChange={(e) =>
                            handlePhysicalActivityInputChange(
                              "type",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label>Duration (hr)</Label>
                        <Input
                          placeholder="e.g. 8"
                          value={physicalActivitiesInput.duration}
                          onChange={(e) =>
                            handlePhysicalActivityInputChange(
                              "duration",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                    <Button
                      onClick={handleAddPhysicalActivity}
                      disabled={
                        physicalActivitiesInput.type === "" ||
                        physicalActivitiesInput.duration === 0 ||
                        log.physicalActivities.find(
                          (i) => i.type === physicalActivitiesInput.type,
                        )
                          ? true
                          : false
                      }
                    >
                      Add
                    </Button>
                    {log.physicalActivities.map(({ type, duration }) => {
                      return (
                        <div key={type} className="flex flex-row gap-4">
                          <div className="w-full">
                            <Label>Type</Label>
                            <Input
                              placeholder="e.g. Sports"
                              value={type}
                            ></Input>
                          </div>
                          <div>
                            <Label>Duration (hr)</Label>
                            <Input
                              placeholder="e.g. 8"
                              value={duration}
                            ></Input>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Checkbox
                      onClick={() => {
                        handleOnChangeLog(
                          "socialInteractions",
                          !log.socialInteractions,
                        );
                      }}
                      checked={log.socialInteractions}
                      defaultChecked={log.socialInteractions}
                    />
                    <Label
                      className="cursor-pointer"
                      onClick={() => {
                        handleOnChangeLog(
                          "socialInteractions",
                          !log.socialInteractions,
                        );
                      }}
                    >
                      Social interactions
                    </Label>
                  </div>

                  <Label>Symptoms of depression or anxiety</Label>
                  <Input placeholder="e.g. Feeling sad"></Input>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  onClick={handleSaveLog}
                  disabled={
                    log.moodRatings === undefined ||
                    log.anxietyLevels === undefined ||
                    log.stressLevels === undefined
                  }
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
