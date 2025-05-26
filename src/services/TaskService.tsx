import type { Task, TaskCreateDTO, EditTask } from "../models/TaskModel";

const API_BASE_URL = "http://localhost:5188/api/task";

function mapStatusStringToNumber(status: string): number {
  switch (status) {
    case "Pendente":
      return 0;
    case "Em progresso":
      return 1;
    case "Completo":
      return 2;
    default:
      return 0; // padrão para pendente
  }
}

export async function createTask(task: TaskCreateDTO): Promise<Task> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao criar tarefa: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro no createTask:", error);
    throw error;
  }
}

export async function getAllTasks(): Promise<Task[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/get-all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao buscar tarefas: ${errorText}`);
    }

    const data = await response.json();
    return data as Task[];
  } catch (error) {
    console.error("Erro no getAllTasks:", error);
    throw error;
  }
}

export const updateTask = async (task: EditTask) => {
  const response = await fetch(`${API_BASE_URL}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao atualizar a tarefa: ${errorText}`);
  }

  return response.json();
};

export const deleteTask = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao deletar a tarefa: ${errorText}`);
  }

  return true; // ou retorna response.json() se o backend devolver algo
};
