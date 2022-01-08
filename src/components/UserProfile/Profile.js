import React from 'react'
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import rene from '../../assets/images/rene.jpg'
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { color } from '@mui/system';


import firebase from 'firebase'
import Drawer from '../UI/drawer';
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

  
    box: {
      
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(1),
      borderRadius:"5px",
      backgroundColor:"#DCDCDC"
    },
    textCenter: {
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '15px',
      
    },
    text: {
      margin: '15px 0px'
    },
    btn: {
      fontSize: '15px'
    },
  
    gridclass: {
  
      display: 'block',
      
      margin: 'auto',
  
  
  
    },
    gridfl: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        
    }
  }));


const Profile = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();
    const userData = GetData()
   
    return (
        <div>
            <Grid container direction='row' className={classes.gridfl}>
            <Grid sm={8} xs={12} direction='column' className={classes.gridclass}>

        <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2 }}
        >
           

            

            <Grid container direction="row" className={classes.box} justifyContent="space-around">
            <Grid item direction="column" >

               

            <Avatar sx={{ height: '100px', width: '100px' }} style={{marginLeft:"15px", marginTop:"15px"}} />
            <p className={classes.textCenter}><b>{userData?  userData[0]?.name : " "}</b><br />{userData?  userData[0]?.email : " "}</p>

            </Grid>
            <Button color="primary" variant='contained' size='small' >Edit Profile</Button>
            <Grid item direction="column">
                <p className={classes.text}><b>Gender</b><br />info</p>
                <p className={classes.text}><b>Phone No.</b><br />info</p>
            
                <p className={classes.text}><b>Roll No.</b><br />info</p>
               
            </Grid>
            </Grid>

        </Stack>
        </Grid>
        </Grid>
        </div>
    )
}

export default Profile
