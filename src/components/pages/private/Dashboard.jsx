import { Box} from '@mui/material'
import React from 'react'
import TableWithFeatures from '../../TableWithFeatures'
import CustomBreadCrumbs from '../common/CustomBreadCrumbs'

const Dashboard = () => {
  return (
    <Box  sx={{height:"80vh", width:"80vw" ,}}>
      <CustomBreadCrumbs/>
        <TableWithFeatures/>
    </Box>
  )
}

export default Dashboard