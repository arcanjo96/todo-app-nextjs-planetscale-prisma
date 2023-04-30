import { prisma } from ".";

export interface Todo {
  id: string;
  description: string;
  done: boolean;
}

export async function getAllTodos() {
  return await prisma.todo.findMany();
}

export async function createTodo(description: string) {
  await prisma.todo.create({
    data: {
      description
    }
  });
}