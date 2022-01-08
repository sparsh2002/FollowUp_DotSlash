import React from 'react'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState,useEffect } from 'react';
import firebase from 'firebase'



const Comments = (props) => {
    

    const [comment, setComment] = useState('')

    function publishComment(){
        
        setComment('')
    }
    


    return (
        <div>
            <div>
                        <h3>Comments</h3>
                        <Stack>
                            { props.allComments ? (
                             (props.allComments).map((res,i ) =>
                            <Stack direction="row" spacing={2} style = {{ display: "flex", alignItems: "center" }}>
                            <Avatar alt="Remy Sharp" src={res.imageUrl} size="small" />
                            <div>
                            <p><b>{res.name}</b><br/>{res.content}</p>
                            
                            </div>
                            </Stack>
                             ) 
                            ) : " "
                            }
                        </Stack>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <Input id="icomment-text" variant="standard" fullWidth 
                        endAdornment={<InputAdornment position="end"><Button onClick={publishComment}>POST</Button></InputAdornment>}
                        />
                        </Box>
                    </div>
        </div>
    )
}

export default Comments
