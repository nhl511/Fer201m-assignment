import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
function Footer() {
  return (
    <Grid container pt={15}>
    <Box style={{backgroundColor:'#2c3e50', color:'white', height:'200px'}} sx={{ flexGrow: 1 }}>
        <Typography align='center' pt={2}>
          copyright &copy; 2022
        </Typography>
    </Box>
  </Grid>
  )
}

export default Footer
