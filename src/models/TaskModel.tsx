export type StatusTask = "Pending" | "InProgress" | "Completed";

export interface Task {
  id: number;
  titulo: string;
  descricao?: string;
  status: StatusTask;
  dataCadastro: string;      // geralmente vem como string no JSON
  dataConclusao?: string;
}

export interface TaskCreateDTO {
  titulo: string;
  descricao?: string;
  status: number; // 0 = Pendente
}


export interface EditTask {
  id: number;
  titulo: string;
  descricao?: string;
  status: number;
}


