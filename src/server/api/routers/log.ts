import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const logRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        moodRatings: z.number(),
        anxietyLevels: z.number(),
        stressLevels: z.number(),
        sleepHours: z.number().optional(),
        sleepQuality: z.number().optional(),
        sleepDisturbances: z.boolean().optional(),
        socialInteractions: z.boolean().optional(),
        symptoms: z.string().optional(),
        physicalActivities: z
          .object({
            type: z.string(),
            duration: z.number(),
          })
          .array()
          .optional(),
        createdAt: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        moodRatings,
        anxietyLevels,
        stressLevels,
        sleepHours,
        sleepQuality,
        sleepDisturbances,
        socialInteractions,
        symptoms,
        physicalActivities,
        createdAt,
      } = input;
      return ctx.db.log.create({
        data: {
          moodRatings,
          anxietyLevels,
          stressLevels,
          sleepHours,
          sleepQuality,
          sleepDisturbances,
          socialInteractions,
          symptoms,
          physicalActivities: {
            create: physicalActivities?.map(({ type, duration }) => ({
              type,
              duration,
            })),
          },
          createdBy: { connect: { id: ctx.session.user.id } },
          createdAt: createdAt ?? undefined,
        },
      });
    }),

  getLogs: protectedProcedure.query(async ({ ctx }) => {
    const logs = await ctx.db.log.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return logs ?? null;
  }),

  getLogsByDate: protectedProcedure
    .input(z.object({ startDate: z.date(), endDate: z.date() }))
    .query(async ({ ctx, input }) => {
      const { startDate, endDate } = input;
      const logs = await ctx.db.log.findMany({
        orderBy: { createdAt: "asc" },
        where: {
          createdBy: { id: ctx.session.user.id },
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      return logs ?? null;
    }),
});
