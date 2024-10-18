import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box component={"footer"} p={5} sx={{border:"0.1px solid" , borderTopLeftRadius:50, borderTopRightRadius:50}}>
        
        <Box>
          <List>
           
              <ListItemText>dashboard</ListItemText>
          
           
              <ListItemText>dashboard</ListItemText>
           
           
              <ListItemText>dashboard</ListItemText>
           
          </List>
        </Box>
    </Box>
  )
}

export default Footer