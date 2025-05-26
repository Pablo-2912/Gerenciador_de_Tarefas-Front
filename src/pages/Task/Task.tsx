import { useEffect, useState } from "react";
import Card from "../components/task-card/Card";
import PopUpCard from "../components/new-card/PopUpCard";
import EditPopUpCard from "../components/infos-card/EditPopCard";
import type { Task, TaskCreateDTO, EditTask, StatusTask } from "../../models/TaskModel";
import { createTask, getAllTasks, updateTask, deleteTask } from "../../services/TaskService";
import "./Task.css";
import { Row, Col } from "react-bootstrap";

const Task = () => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [dynamicTasks, setDynamicTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const mapStatus = (status: number | string): "Pending" | "InProgress" | "Completed" => {
    if (status === 0 || status === "0") return "Pending";
    if (status === 1 || status === "1") return "InProgress";
    if (status === 2 || status === "2") return "Completed";
    return "Pending";
  };

  const numberToStatusMap: Record<number, StatusTask> = {
    0: "Pending",
    1: "InProgress",
    2: "Completed",
  };

  const handleNewClick = () => {
    setSelectedTask(null);
    setShowPopUp(true);
  };

  const handleDoubleClick = (task: Task) => {
    setSelectedTask(task);
    setShowPopUp(true);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksFromAPI = await getAllTasks();
        const mappedTasks: Task[] = tasksFromAPI.map((task: any) => ({
          ...task,
          status: mapStatus(task.status),
        }));
        setDynamicTasks(mappedTasks);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTaskData: TaskCreateDTO) => {
    try {
      const savedTask = await createTask(newTaskData);
      const mappedTask: Task = {
        ...savedTask,
        status: mapStatus(savedTask.status),
      };
      setDynamicTasks((prev) => [mappedTask, ...prev]);
      setShowPopUp(false);
    } catch (error) {
      alert("Erro ao salvar tarefa: " + error);
    }
  };

  const updateTaskHandler = async (updatedTask: EditTask) => {
    try {
      await updateTask(updatedTask);
      setDynamicTasks((tasks) =>
        tasks.map((t) =>
          t.id === updatedTask.id
            ? {
                ...t,
                titulo: updatedTask.titulo,
                descricao: updatedTask.descricao,
                status: numberToStatusMap[updatedTask.status],
              }
            : t
        )
      );
      setShowPopUp(false);
      setSelectedTask(null);
    } catch (error) {
      alert("Erro ao atualizar tarefa: " + error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setDynamicTasks((tasks) => tasks.filter((task) => task.id !== id));
      setShowPopUp(false);
      setSelectedTask(null);
    } catch (error) {
      alert("Erro ao deletar tarefa: " + error);
    }
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const mapStatusToLabel = {
    Pending: "Pendente",
    InProgress: "Em progresso",
    Completed: "Completo",
  };

  const filterTasks = (taskList: Task[]) =>
    selectedStatuses.length === 0
      ? taskList
      : taskList.filter((task) => selectedStatuses.includes(mapStatusToLabel[task.status]));

  const filteredDynamicTasks = filterTasks(dynamicTasks);

  return (
    <div className="Task-container">
      <div className="Task-content">
        <Row className="task-status-row">
          {["Pendente", "Em progresso", "Completo"].map((label) => (
            <Col className="task-status-col" xs={12} sm={6} md={3} lg={3} key={label}>
              <button
                className={`task-status-button ${selectedStatuses.includes(label) ? "selected" : ""}`}
                onClick={() => toggleStatus(label)}
              >
                {label}
              </button>
            </Col>
          ))}
          <Col className="task-status-col" xs={12} sm={6} md={3} lg={3}>
            <button className="task-status-button task-status-button-add" onClick={handleNewClick}>
              Novo
            </button>
          </Col>
        </Row>

        {showPopUp && selectedTask === null && <PopUpCard onClose={() => setShowPopUp(false)} onSave={addTask} />}

        {showPopUp && selectedTask !== null && (
          <EditPopUpCard
            task={selectedTask}
            onClose={() => {
              setShowPopUp(false);
              setSelectedTask(null);
            }}
            onSave={updateTaskHandler}
            onDelete={handleDelete}
          />
        )}

        <div className="task-scrolable-content">
          <Row className="task-row">
            {filteredDynamicTasks.map((task, index) => (
              <Col
                className="task-col"
                md={6}
                lg={4}
                key={`task-${task.id}-${index}`}
                onDoubleClick={() => handleDoubleClick(task)}
              >
                <Card
                  task={task}
                  onEdit={(task) => {
                    setSelectedTask(task);
                    setShowPopUp(true);
                  }}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Task;
