import React, { useReducer, useEffect } from 'react';

function ComponentReducer() {

    const ComponenteIni = {
        nuevaTarea: { name: '', done: false },
        tareas: [],
      };
      
      const tareasReducer = (state, action) => {
        switch (action.type) {
          case 'SET_NUEVA_TAREA':
            return { ...state, nuevaTarea: action.payload };
          case 'AGREGAR_TAREA':
            return { ...state, tareas: [...state.tareas, action.payload], nuevaTarea: { name: '', done: false } };
          case 'ELIMINAR_TAREA':
            return { ...state, tareas: state.tareas.filter((_, index) => index !== action.payload) };
          case 'CARGAR_TAREAS':
            return { ...state, tareas: action.payload };
          default:
            return state;
        }
      };

   const [state, dispatch] = useReducer(tareasReducer, ComponenteIni, () => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? { ...ComponenteIni, tareas: JSON.parse(tareasGuardadas) } : ComponenteIni;
  });

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(state.tareas));
  }, [state.tareas]);

  const GuardarTareas = (e) => {
    e.preventDefault();
    if (!state.nuevaTarea.name.trim()) return;
    dispatch({ type: 'AGREGAR_TAREA', payload: state.nuevaTarea });
  };

  const eliminarTarea = (index) => {
    dispatch({ type: 'ELIMINAR_TAREA', payload: index });
  };

  return (
    <div className="App">
        <h1>UseReducer</h1>
      <form onSubmit={GuardarTareas}>
        <input
          type="text"
          placeholder="Ingresar nueva tarea"
          value={state.nuevaTarea.name}
          onChange={(e) => dispatch({ type: 'SET_NUEVA_TAREA', payload: { ...state.nuevaTarea, name: e.target.value } })}
        />
        <button type="submit">Guardar</button>
      </form>

      <ul>
        {state.tareas.map((tarea, index) => (
          <li key={index}>
            <span>
              {tarea.name}
            </span>
            <button onClick={() => eliminarTarea(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComponentReducer;