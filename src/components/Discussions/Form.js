import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

const Form = () => {
    return (
        <>
            <Paper>
            <Grid direction="column">
                <div>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <p>name</p>
                </div>
                <TextField fullWidth label="fullWidth" id="fullWidth" />
                <TextField
          id="filled-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="filled"
        />
            </Grid>
        </Paper>
        </>
    )
}

export default Form
