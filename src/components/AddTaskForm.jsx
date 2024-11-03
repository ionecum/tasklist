import React, { useState } from 'react';
import { TextField, Button, Stack, Paper } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function AddTaskForm({ onAddTask }) {
  const [newTask, setNewTask] = useState(''); // State for new task input

  const handleInputChange = (event) => {
    setNewTask(event.target.value); // Update state when input changes
  };

  const handleKeyDown = (event) => { // Separated function for handling Enter key press
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTask(); // Call handleAddTask when Enter is pressed
    }
  };
  
  const handleAddTask = () => {
    if (event.key === 'Enter'){
      event.preventDefault(); // prevent default form submission
    }
    if (newTask.trim() !== '') {
      onAddTask({ id: Date.now(), title: newTask, completed: false }); // Pass new task to App
      setNewTask(''); // Clear the input field
    }
  };

  return (
    <Item>
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="Add Task"
          value={newTask}
          onChange={handleInputChange} // Bind the input change handler
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          startIcon={<AddCircleIcon />}
        >
          Add
        </Button>
      </Stack>
    </Item>
  );
}

export default AddTaskForm;
