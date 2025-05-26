import React, { useState } from "react";
import "./PopUpCard.css";
import { Row, Col } from "react-bootstrap";
import type { Task, TaskCreateDTO } from "../../../models/TaskModel";

interface PopUpCardProps {
  onClose: () => void;
  onSave: (task: TaskCreateDTO) => void;
}



const PopUpCard: React.FC<PopUpCardProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [touched, setTouched] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

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

  const newTaskToSend: TaskCreateDTO = {
    titulo: title,
    descricao: description,
    status: 0, // número para criar
  };

  onSave(newTaskToSend);
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
            maxLength={50} // Limite de 50 caracteres
            className={`popcard-title ${showError ? "input-error" : ""}`}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleBlur}
            />

<div className="char-count">{title.length} / 50</div>

        {(showError || showWarning) && (
          <div className="error-message">O título deve ter no mínimo 1 caractere.</div>
        )}
        <textarea
          placeholder="Descrição"
          className="popcard-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="popcard-div-botoes">
          <Row className="popcard-row">
            <Col sm={12} md={6} className="popcard-col-cancel">
              <button className="popcard-btn-close" onClick={onClose}>
                Cancelar
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

export default PopUpCard;
