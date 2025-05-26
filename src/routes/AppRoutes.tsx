// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home.tsx';
import Task from '../pages/task/Task';
//import About from '../pages/About';



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Task" element={<Task />} />
      </Routes>
    </BrowserRouter>
  );
}

