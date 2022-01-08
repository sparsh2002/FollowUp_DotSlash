import React from 'react'
import Drawer from '../components/UI/drawer'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@mui/material/Typography'
import Cards from '../components/UI/cards'

function Borrow() {
    return (
        <div>
            <Drawer />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} >
                    <Cards data={{ title:'Borrowed' , description:"This section is used to Display the items you have placed for lending"}} />

                </Grid>

                <Grid item xs={12} sm={12} md={12} >
                    <Cards data={{ title:'Bought' , description:"This section is used to Display the items you have placed for lending"}} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Borrow