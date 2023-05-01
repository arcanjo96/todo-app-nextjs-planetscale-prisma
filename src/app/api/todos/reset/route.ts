import { removeAll } from "../../../../../lib/db";

export async function POST(_: Request) {
  await removeAll();

  return new Response();
}