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

const Home = () => {
  // const session = getServerAuthSession();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  //   console.log(test?.user);
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header> */}
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">{`Hello there, let's get logging!`}</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Log entry</CardTitle>
                <CardDescription>
                  Let&#39;s note down how we&#39;re doing today.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-y-3">
                  <div className="flex flex-col gap-0.5">
                    <Label htmlFor="terms">Mood ratings</Label>
                    <div className="flex justify-start">
                      <ToggleGroup type="single" className="self-start">
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
                    <Label htmlFor="terms">Anxiety levels</Label>
                    <div className="flex justify-start">
                      <ToggleGroup type="single" className="self-start">
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
                    <Input placeholder="e.g. 8"></Input>
                    <Label>Quality of sleep</Label>
                    <ToggleGroup type="single" className="self-start">
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
                      <Checkbox />
                      <Label>Sleep disturbances</Label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <Label className="text-md">Physical activity</Label>
                    <Label>Type</Label>
                    <Input placeholder="e.g. Sports"></Input>
                    <Label>Duration</Label>
                    <Input placeholder="e.g. 8"></Input>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Checkbox />
                    <Label>Social interactions</Label>
                  </div>
                  <Label>Stress levels</Label>
                  <ToggleGroup type="single" className="self-start">
                    <ToggleGroupItem value="-2" aria-label="Toggle very Tired">
                      Very stressed
                    </ToggleGroupItem>
                    <ToggleGroupItem value="-1" aria-label="Toggle Tired">
                      Stressed
                    </ToggleGroupItem>
                    <ToggleGroupItem value="0" aria-label="Toggle neutral">
                      Neutral
                    </ToggleGroupItem>
                    <ToggleGroupItem value="1" aria-label="Toggle rested">
                      Relaxed
                    </ToggleGroupItem>
                    <ToggleGroupItem value="2" aria-label="Toggle very rested">
                      Very relaxed
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <Label>Symptoms of depression or anxiety</Label>
                  <Input placeholder="e.g. Feeling sad"></Input>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
