import React, { useState, useEffect } from 'react';
import { 
  Stack, 
  Typography,
  Box,
  ThemeProvider, 
  createTheme, 
  CircularProgress, 
  Pagination 
} from '@mui/material';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

/* Main component */
function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async () => {
    setIsLoading(true);
    // using fetch promise to retrieve data from backend api
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
      const data = await response.json();
      setTasks(data);
      setTotalPages(Math.ceil(data.length / tasksPerPage));
    } catch(error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // on component mount
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (newTask) => {
    if (newTask.title.trim() !== "") {
      // Update the tasks array with the new task, then sort the array
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        return updatedTasks.sort((a, b) => b.id - a.id); // Sort in descending order
      });
    } else {
      alert("Please enter a valid task title.");
    }
  };

  const theme = createTheme(); // Create a theme instance

  return (
    /* Wrapping the app with ThemeProvider */
    <ThemeProvider theme={theme}>
      <>
        <h1>Vite + React Beautyful Task Manager</h1>
        <div className="card">
          <p>This is a public code just to make a test about an extensible task list</p>
        </div>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <Stack sx={{ mt: 2, padding: 2 }}>
          <Typography variant="h4" align="center">
            Task Manager
          </Typography>

          <Box sx={{ mt: 2 }}>
            <AddTaskForm onAddTask={handleAddTask} />
          </Box>
          <Box sx={{ mt: 2 }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <TaskList 
                  tasks={currentTasks} 
                  onToggleComplete={handleToggleComplete} 
                  onDeleteTask={handleDeleteTask}
                />
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  sx={{ mt: 2 }}
                />
              </>
            )}
          </Box>
        </Stack>

        <p className="read-the-docs">This project is made under MIT public license.</p>
      </>
    </ThemeProvider>
  );
}

export default App;
