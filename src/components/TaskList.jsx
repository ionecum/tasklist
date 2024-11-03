import React from 'react';
import { 
    List,
    ListItem, 
    ListItemText,
    Checkbox,
    IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
//import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) { 
    return (
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox 
              checked={task.completed} 
              onChange={() => onToggleComplete(task.id)} 
            />
            <ListItemText
              primary={task.title}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            />
            <IconButton onClick={() => onDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    );
  }

export default TaskList;
