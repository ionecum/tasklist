import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskItem({ task, onToggleComplete, onDeleteTask }){
    return (
        <ListItem key={task.id}>
            <Checkbox 
                checked={task.completed}
                onChange={ () => onToggleComplete(task.id)}
            />
        <ListItemText 
            primary={task.title}
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        />
        <IconButton onClick={() => onDeleteTask(task.id)}>
           <DeleteIcon />
         </IconButton>
    </ListItem>
    )
}
export default TaskItem;