import React from "react";
import type { Task } from "../../../models/TaskModel";
import "./Card.css";

interface CardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const Card: React.FC<CardProps> = ({ task, onEdit }) => {
  const title: string = task.titulo;

  const statusClass =
    task.status === "Pending"
      ? "pending"
      : task.status === "InProgress"
      ? "inProgress"
      : "completed";

  const status =
    task.status === "Pending"
      ? "Pendente"
      : task.status === "InProgress"
      ? "Em progresso"
      : "Completo";

  return (
    <div className={`card-container card-container-${statusClass}`}>
      <div className={`card-line card-line-${statusClass}`}></div>
      <div className={`card-content card-content-${statusClass}`}>
        <div className="card-title">
          <label>{title}</label>
        </div>
        <div className="card-data card-dataCriacao">
          <label className="card-label-dataCriacao">
            Data de criação: <br /> {formatDate(task.dataCadastro)}
          </label>
        </div>

        {statusClass === "completed" && (
          <div>
            <br />
            <label>Data de conclusão: <br />{formatDate(task.dataConclusao || "")}</label>
          </div>
        )}

        <div className="card-footer">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onEdit(task);
            }}
          >
            Editar
          </a>
          <div className="card-status"> {status}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
