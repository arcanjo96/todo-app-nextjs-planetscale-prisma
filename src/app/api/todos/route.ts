import { createTodo, getAllTodos } from "../../../../lib/db";

export async function GET(request: Request) {
  const todos = await getAllTodos();

  return new Response(JSON.stringify(todos));
}

export async function POST(request: Request) {
  const body = await request.json();

  await createTodo(body.description);

  return new Response();
}
