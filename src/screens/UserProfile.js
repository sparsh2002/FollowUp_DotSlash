import React from 'react'
import EditProfile from '../components/UserProfile/EditProfile'
import { useState, useEffect } from "react";
import Drawer from '../components/UI/drawer'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { color } from '@mui/system';
import Profile from '../components/UserProfile/Profile'


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

const UserProfile = () => {
    const [page,setpage] = useState(<Profile />);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();
    const status = localStorage.getItem('profilepage')
    if(status==='profile'){
        setpage(<Profile />)
    }
    // else if(status=='lend'){
        
    // }
    return (
        <div>
            <h1>This is UserProfile Page</h1>
            <Drawer />
            {
                page
            }
        </div>
    )
}

export default UserProfile

