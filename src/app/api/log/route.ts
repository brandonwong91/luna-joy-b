/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse, type NextRequest } from "next/server";
import { api } from "~/trpc/server";

export async function POST(request: NextRequest) {
  try {
    // Extract the JSON body from the request
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = await request.json();

    // Manually map the fields from the request body to your API call
    const logData = {
      moodRatings: body.moodRatings ?? 0,
      anxietyLevels: body.anxietyLevels ?? 0,
      stressLevels: body.stressLevels ?? 0,
      sleepHours: body.sleepHours ?? null,
      sleepQuality: body.sleepQuality ?? null,
      sleepDisturbances: body.sleepDisturbances ?? false,
      socialInteractions: body.socialInteractions ?? false,
      symptoms: body.symptoms ?? "",
      physicalActivities: body.physicalActivities ?? [], // Ensure physicalActivities is an array
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(), // Default to current date if not provided
    };

    // Call your API log creation method with the mapped data
    const log = await api.log.create(logData);

    // Return the created log as the response
    return NextResponse.json(log);
  } catch (error) {
    // Handle any errors during the process
    return NextResponse.json({ error }, { status: 400 });
  }
}
