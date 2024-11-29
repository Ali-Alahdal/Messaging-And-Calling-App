import { useRef, useState } from "react";
import { useEffect } from "react";
import { getChatsAPI } from "../../Hooks/Apis";
import Chat from "../Parts/Chat";


function Dialog(props) {

    const refDiv = useRef(null);
    
    const [chats , setChats] = useState([])
    
    useEffect(() =>{
        document.body.append(refDiv.current)
    },[])

    useEffect(() =>{
        const fetchChats = async () =>{
            const response = await getChatsAPI();
            setChats(response)
            console.log(response);
            
        }
    
        fetchChats();
    },[])
    return ( 
        
        <>
            {/* <div ref={refDiv} className="fixed w-full h-full top-0  bg-opacity-20 bg-black">

            </div> */}

            <div ref={refDiv} className="fixed w-1/2 h-1/2 top-[25%] left-[25%]   bg-[var(--bgS)] overflow-y-scroll">
                    {
                      
                        chats.map((chat , index) =>{
                            return  <Chat setAsCurrent={props.setCurrentChat} key={index} receiver={chat.chatUser_id} username={chat.chat_name} chat_id={chat.chat_id} />
                        }) 
                    }
            </div>

        </>
        );
}

export default Dialog;