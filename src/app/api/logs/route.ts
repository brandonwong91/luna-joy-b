import { api } from "~/trpc/server";

export async function GET() {
  return Response.json(await api.log.getLogs());
}
