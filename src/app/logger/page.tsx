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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type Log, useLogStore } from "./state";

const Home = () => {
  const router = useRouter();
  // const session = getServerAuthSession();
  useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  //   console.log(test?.user);

  const { log, setLog } = useLogStore((state) => state);

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

  const handleSaveLog = () => {
    console.log(log);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 pt-16 md:gap-8 md:p-10 md:pt-16">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-center text-2xl font-semibold md:text-3xl">{`Hello there, let's get logging!`}</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-fit place-self-center rounded-md border"
          />
          <div className="grid place-content-center gap-6">
            <Card x-chunk="dashboard-04-chunk-1" className="w-64 md:w-fit">
              <CardHeader>
                <CardTitle>Log entry</CardTitle>
                <CardDescription>
                  Let&#39;s note down how we&#39;re doing today.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-y-3 md:w-fit">
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
                  </div>
                  <div className="flex flex-col gap-y-3">
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
                        onClick={() => {
                          handleOnChangeLog(
                            "sleepDisturbances",
                            !log.sleepDisturbances,
                          );
                        }}
                      />
                      <Label>Sleep disturbances</Label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <Label className="text-md">Physical activity</Label>
                    <Label>Type</Label>
                    <Input placeholder="e.g. Sports"></Input>
                    <Label>Duration (hr)</Label>
                    <Input placeholder="e.g. 8"></Input>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Checkbox
                      onClick={() => {
                        handleOnChangeLog(
                          "sleepDisturbances",
                          !log.socialInteractions,
                        );
                      }}
                    />
                    <Label>Social interactions</Label>
                  </div>
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
                  >
                    <ToggleGroupItem value="5" aria-label="Toggle very Tired">
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
                    <ToggleGroupItem value="1" aria-label="Toggle very rested">
                      Very relaxed
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <Label>Symptoms of depression or anxiety</Label>
                  <Input placeholder="e.g. Feeling sad"></Input>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleSaveLog}>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
