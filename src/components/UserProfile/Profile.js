import React from 'react'
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { color } from '@mui/system';

import firebase from 'firebase'
function GetData(){
    const [data, setdata] = useState([])
    let id = localStorage.getItem('userId')
    useEffect(() => {
        const fetched = firebase
        .firestore()
        .collection('user')
        .onSnapshot((snapshot) =>{
            setdata(snapshot.docs.map((doc)=>doc.data()))
            
        })
        
    }, [])

    for(var i=0 ; i<data.length ; i++){
        if(data[i]['id']==id){
            setdata(data[i])
        }
    }
    return data
}


const useStyles = makeStyles(theme => ({

    profileCard: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
      border: '1px solid #000',
  
  
    },
    box: {
      border: '1px solid #000'
    },
    textCenter: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '15px',
    },
    text: {
      margin: '30px 0px'
    },
    btn: {
      fontSize: '15px'
    },
  
    gridclass: {
  
      display: 'block',
  
      margin: 'auto',
  
  
  
    }
  }));


const Profile = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

    const userData = GetData()
   
    return (
        <div>
            <Grid sm={8} xs={12} direction='column' className={classes.gridclass}>

        <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2 }}
        >

            <Grid className={classes.profileCard} >
            <Avatar sx={{ height: '100px', width: '100px' }} />
            <p className={classes.textCenter}><b>Diana Cooper</b><br />Daina@gmail.com</p>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <p className={classes.textCenter}><b>5</b><br />Left</p>
                <p className={classes.textCenter}><b>15</b><br />Past</p>
            </Stack>
            {/* <Button color="primary" variant='contained' size='small' onClick={toggleProfile}>Edit Profile</Button> */}
            </Grid>

            <Grid container direction="row" className={classes.box} justifyContent="space-around">
            <Grid item direction="column" >

                <p className={classes.text}><b>{userData?  userData[0]?.name : " "}</b><br />Info</p>

                <p className={classes.text}><b>Name</b><br />Info</p>
                <p className={classes.text}><b>Name</b><br />Info</p>
                <p className={classes.text}><b>Name</b><br />Info</p>
            </Grid>
            <Grid item direction="column">
                <p className={classes.text}><b>Name</b><br />Info</p>
                <p className={classes.text}><b>Name</b><br />Info</p>
            </Grid>
            <Grid item direction="column">
                <p className={classes.text}><b>Name</b><br />Info</p>
                <p className={classes.text}><b>Name</b><br />Info</p>
            </Grid>
            </Grid>

        </Stack>
        </Grid>

        </div>
    )
}

export default Profile
