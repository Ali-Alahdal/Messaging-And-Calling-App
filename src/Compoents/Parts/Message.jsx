import { useEffect, useState } from "react";

function Message(props) {

    const [formatedTime , setFormatedTime] = useState(props.time.toString().split("T")[1].split(".")[0])
    useEffect(() =>{
        const date = new Date(props.time);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        setFormatedTime(date.toLocaleTimeString('en-US', options))
    },[])
   
    return ( 
        // props.left ?
        <div ref={props.lastMessage} className={"flex p-3 bg-[var(--btn-l)] text-white rounded-2xl gap-3 h-max  my-2 w-max max-w-[500px] max-h-auto overflow-x-hidden " + props.style} >
            <span className="w-100  break-all	 ">{props.content}</span>
            <span className="text-[9px] text-[#b8b8b8]  align-bottom content-end me-0	">{formatedTime}</span>
            {/* <svg className="size-3.5 align-bottom content-end place-self-end ms-0 text-green-400	" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg> */}


        </div>
    
      );
}

export default Message;