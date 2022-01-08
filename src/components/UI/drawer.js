import { useState } from 'react'
import Box from '@material-ui/core/Box'
import SwipableDrawer from '@mui/material/SwipeableDrawer';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'
import Profile from '../UserProfile/Profile';


const useStyles = makeStyles({
    list: {
        width: 250
    },
    icon: {
        
        position: "absolute",
        left: '10px'
    }
})

export default function Drawer() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [page , setPage] = useState(<Profile />)
    function toggelPage(val){
        setPage(val)
        localStorage.setItem('profilepage' , val )
    }

    return (<div >

        <span >
        <IconButton
           
            color="inherit"
            // aria-label="open drawer"
            className={classes.icon}
            onClick={() => setOpen(true)}
        >
            <MenuIcon > </MenuIcon>
        </IconButton>
        </span>

        

        <SwipableDrawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => { }}
        >
        
            <div className={classes.list}>
                <Box textAlign="center" p={2}>
                   <Typography variant="h5">Menu</Typography> 

                </Box>
                <Divider />
                <List>
                    <ListItemButton onClick={() => { 
                        toggelPage('profile')
                    }}>
                        <ListItemText primary={'Profile'} />
                    </ListItemButton>

                    <ListItemButton onClick={() => {
                        toggelPage('lend')
                        console.log('Lend/Sell')
                         }}>
                        <ListItemText primary={'Lend/Sell'} />
                    </ListItemButton>

                    <ListItemButton onClick={() => { 
                        toggelPage('borrow')
                    }}>
                        <ListItemText primary={'Borrow/Buy'} />
                    </ListItemButton>

                    <ListItemButton onClick={() => { }}>
                        <ListItemText primary={'Log Out'} />
                    </ListItemButton>



                </List>
            </div>
        </SwipableDrawer>
    </div>
    )
}