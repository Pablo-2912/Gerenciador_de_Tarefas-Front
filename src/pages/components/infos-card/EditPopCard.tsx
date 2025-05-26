import React, { useState, useEffect } from "react";
//import "../new-card/PopUpCard.css";
import "./EditPopCard.css";
import { Row, Col, Form } from "react-bootstrap";
import type { Task, StatusTask, EditTask } from "../../../models/TaskModel";

interface EditPopUpCardProps {
  task: Task;
  onClose: () => void;
  onSave: (taskDto: EditTask) => void;
  onDelete: (taskId: number) => void;
}

// Mapas para converter status string <-> número
const numberToStatusMap: Record<number, StatusTask> = {
  0: "Pending",
  1: "InProgress",
  2: "Completed",
};

const statusToNumberMap: Record<StatusTask, number> = {
  Pending: 0,
  InProgress: 1,
  Completed: 2,
};

const EditPopUpCard: React.FC<EditPopUpCardProps> = ({ task, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(task.titulo);
  const [description, setDescription] = useState(task.descricao ?? "");
  const [status, setStatus] = useState<StatusTask>(task.status ?? "Pending");

  const [touched, setTouched] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setTitle(task.titulo);
    setDescription(task.descricao ?? "");
    setStatus(task.status ?? "Pending");
  }, [task]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setShowWarning(false);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handleSave = () => {
    if (title.trim().length === 0) {
      setShowWarning(true);
      return;
    }

    const updatedTask: EditTask = {
      id: task.id,
      titulo: title,
      descricao: description,
      status: statusToNumberMap[status], // converte para número no DTO
    };

    onSave(updatedTask);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const showError = touched && title.trim().length === 0;

  return (
    <div className="popcard-overlay">
      <div className="popcard-card">
        <div className="popcard-div-close">
          <button className="popcard-close" onClick={onClose}>
            ×
          </button>
        </div>

        <input
          type="text"
          placeholder="Título"
          maxLength={50}
          className={`popcard-title ${showError ? "input-error" : ""}`}
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
        />
        <div className="char-count">{title.length} / 50</div>

        {(showError || showWarning) && (
          <div className="error-message">O título deve ter no mínimo 1 caractere.</div>
        )}
        <Form.Group controlId="statusSelect" className="">
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusTask)}
          >
            <option value="Pending">Pendente</option>
            <option value="InProgress">Em andamento</option>
            <option value="Completed">Concluído</option>
          </Form.Select>
        </Form.Group>
        <textarea
          placeholder="Descrição"
          className="popcard-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

       

        <div className="popcard-div-botoes">
          <Row className="popcard-row">
              <Col sm={12} md={6} className="popcard-col-delete">
                <button className="popcard-btn-delete" onClick={handleDelete}>
                  Excluir
                </button>
              </Col>
              <Col sm={12} md={6} className="popcard-col-save">
                <button
                  className="popcard-btn-save"
                  onClick={handleSave}
                  disabled={title.trim().length === 0}
                  style={{ opacity: title.trim().length === 0 ? 0.6 : 1 }}
                >
                Salvar
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default EditPopUpCard;
