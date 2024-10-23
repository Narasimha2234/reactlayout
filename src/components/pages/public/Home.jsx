import { Box, Button, } from '@mui/material';
import Carousel from '../common/Carousel';

import EastIcon from '@mui/icons-material/East';
import { useContext } from 'react';
import { AuthContext } from '../../../auth/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import banner1 from "../../../assets/banner1.mp4"
import banner2 from "../../../assets/banner2.mp4"
import banner3 from "../../../assets/banner3.mp4"


const Home = () => {
  const {isLoggedIn}=useContext(AuthContext)
  const navigate=useNavigate()
  const {enqueueSnackbar}=useSnackbar()
  const handleNavigation=()=>{
   if(!isLoggedIn){
      enqueueSnackbar("please login to proceed" ,{variant:"error"})
   }else{
      navigate("/orchasp/careers/list")
   }
    
  }
  
  return (
    <Box>
      <Carousel items={[banner1,banner2,banner3]} isVideo={true}/>
     <Button  sx={{mt:2,ml:5 , "&:hover":{border:"1px solid"}}} onClick={handleNavigation}>
      
      apply for JOB
      
          <EastIcon sx={{ml:1}} />
      </Button>
    </Box>
  )
}

export default Home