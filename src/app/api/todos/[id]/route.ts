import { removeTodo, updateTodo } from "../../../../../lib/db";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await removeTodo(params.id);

  return new Response();
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();

  await updateTodo(params.id, body);

  return new Response();
}