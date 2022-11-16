import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react'

function Contact() {
  return (
    <Grid container pt={15}>
        <Grid item xs={12}>
            <Typography variant="h3">
                <b>I'd <FavoriteIcon fontSize="large" style={{color:'red'}}/> to help!</b>
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <img src="https://img.freepik.com/premium-vector/cute-mail-cartoon-character_313669-10.jpg?w=2000" width="600"/>
        </Grid>
        <Grid item xs={6} pt={10}>
            <Card sx={{maxWidth:600}}>
                <CardContent align="left">
                    <Grid item mb={2}>
                <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth/>
                </Grid>
                <Grid item mb={2}>
                <TextField id="outlined-basic" label="LastName" variant="outlined" fullWidth/>
                </Grid>
                <Grid item mb={2}>
                <TextField id="outlined-basic" label="What's your email" variant="outlined" fullWidth/>
                </Grid>
                <Grid item mb={4}>
                <TextField multiline rows={5} label="Your question..." variant="outlined" fullWidth/>
                </Grid>
                <Grid item mb={2}>
                    <Button fullWidth variant="contained">Send</Button>
                </Grid>

                </CardContent>
            </Card>
        </Grid>
    </Grid>
  )
}

export default Contact
