import {AccountCircle, ArrowBack} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const ChatNavbar = ({name}:{name:string}) => {

  const navigate = useNavigate()

  return (
    <div className='flex bg-green-500 h-[50px] items-center'>
      <div onClick={()=>navigate("/")}>
      <ArrowBack className='mr-[10px]' />
      </div>
      <AccountCircle className='mr-3'/>
      <div className='mr-[10px]'>{name}</div>
    </div>
  )
}

export default ChatNavbar
