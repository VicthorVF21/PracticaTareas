import React, { useState, useEffect } from 'react';
import ComponentReducer from './Componentes/Usereducer';
import './App.css';

function App() {
  const [nuevaTarea, setNuevaTarea] = useState({ name: '', done: false });
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const GuardarTareas = (e) => {
    e.preventDefault();
    const updatedTasks = [...tareas, nuevaTarea];
    setTareas(updatedTasks);
    setNuevaTarea({ name: '', done: false });
  };

  const eliminarTarea = (index) => {
    const filteredTasks = tareas.filter((_, i) => i !== index);
    setTareas(filteredTasks);
  };

  return (
    <div className="App">
      <div>
        <h1>UseState</h1>
      <form onSubmit={GuardarTareas}>
        <input
          type="text"
          placeholder="Ingresar nueva tarea"
          value={nuevaTarea.name}
          onChange={(e) => setNuevaTarea({ ...nuevaTarea, name: e.target.value })}
        />
        <button type="submit">Guardar</button>
      </form>

      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>
            <span>
              {tarea.name}
            </span>
            <button onClick={() => eliminarTarea(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      </div>
      <div>
        <ComponentReducer/>
      </div>
    </div>
    
  );
}

export default App;