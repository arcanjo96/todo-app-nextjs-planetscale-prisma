import { removeAll } from "../../../../../lib/db";

export async function POST(_: Request) {
  await removeAll(true);

  return new Response();
}