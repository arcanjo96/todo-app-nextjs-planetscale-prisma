import { prisma } from ".";

export interface Todo {
  id: string;
  description: string;
  done: boolean;
}

export async function getAllTodos() {
  return await prisma.todo.findMany({
    orderBy: {
      description: 'desc'
    }
  });
}

export async function createTodo(description: string) {
  await prisma.todo.create({
    data: {
      description
    }
  });
}

export async function removeTodo(id: string) {
  await prisma.todo.delete({
    where: {
      id
    }
  });
}

export async function updateTodo(id: string, data: any) {
  await prisma.todo.update({
    where: {
      id
    },
    data
  });
}

export async function removeAll(done = false) {
  const where = done ? { done } : {};
  await prisma.todo.deleteMany(
    {
      where
    }
  );
}

