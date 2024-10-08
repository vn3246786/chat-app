import { messages } from "../TypeDefinitions"

const Messages = ({data}:{data:messages}) => {

  const sentStyles = "w-fit flex gap-2  bg-green-500 px-[10px] py-[2px] rounded-lg mb-[10px] ml-auto"
  const recievedStyles = "w-fit bg-white px-[10px] py-[2px] rounded-lg mb-[10px]"
 
  return (
    <div className="bg-gray-400 min-h-[93vh] pb-[50px] w-[100vw] pt-[10px] px-[10px]">
      {data.map((msg,i)=>{ 
      return (msg.type==="sent"?
      <div key={i} className={sentStyles}>{msg.message}</div>:
         <div key={i} className={recievedStyles}>{msg.message}</div> )
      })} 

    </div>
  )
}

export default Messages
