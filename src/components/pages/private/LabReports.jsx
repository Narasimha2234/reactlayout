import { Box, colors, Stack } from '@mui/material'
import React from 'react'
import CustomBreadCrumbs from '../common/CustomBreadCrumbs'
import Widget from '../common/Widget'

const data=[{
  title:"Reports",
  icon:"http://10.168.13.27:3030/assets/icons/glass/ic_glass_users.png",
  backgroundColor:"secondary.lighter",
  color:"secondary.dark"
},
{
  title:"Reports",
  icon:"http://10.168.13.27:3030/assets/icons/glass/ic_glass_message.png",
  backgroundColor:"primary.lighter",
  color:"primary.dark"
},
{
  title:"Reports",
  icon:"http://10.168.13.27:3030/assets/icons/glass/ic_glass_users.png",
  backgroundColor:"error.lighter",
  color:"error.dark"
},
{
  title:"Reports",
  icon:"http://10.168.13.27:3030/assets/icons/glass/ic_glass_message.png",
  backgroundColor:"success.lighter",
  color:"success.dark"
}]

const LabReports = () => {
  return (
   <Box sx={{width:"80vw"}}>
      <CustomBreadCrumbs/>
    
         <Stack direction={"row"} spacing={10} mt={3}>
              {data.map((item)=>{
                return(
                  <Widget title={item.title} color={item.color} backgroundColor={item.backgroundColor} icon={item.icon}/>
                )
              })}
         </Stack>
     
   </Box>
  )
}

export default LabReports