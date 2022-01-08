import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import BasicModal  from './modals';







const useStyles = makeStyles({
    button: {
        justifyContent: 'center',
    },
    card: {
        margin: 'auto',
        width: '85%',
    }
})
function Cards(props) {

    const {data} = props
    console.log(data)
    const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    function openModal(){
        setOpen(true)
    }
    const classes = useStyles();

    return (

        

    <div >
        <Card elevation={3} className={classes.card}>
            <CardHeader
                title={data.title}  //Post title from the form
                subheader={data.description}//description from the form
            />

            <CardActions className={classes.button}>
                <Button variant="contained"
                onClick={()=>{
                    openModal()

                }}>View</Button>
               

            </CardActions>
            {open ? <BasicModal open={open} /> : ''}
        </Card>
    </div>
    )
}

export default Cards