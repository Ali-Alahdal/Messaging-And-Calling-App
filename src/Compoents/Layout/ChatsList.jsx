import { useEffect, useState } from "react";
import Chat from "../Parts/Chat";
import '../../App.css'
function ChatsList(props) {
    
    const [chats,setChats] = useState([]);
    const fetchChats = async () =>{
        try {
            const response = await fetch(`https://127.0.0.1:8000/messaging/getChats/${localStorage.getItem("user_id")}/`);

            if(!response.ok){
                throw new Error("Error Happend")
            }else{
                const json =  await response.json();
                setChats(json);
            }
            
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() =>{
        fetchChats();
    },[])
    return ( 
       
            <section className="bg-[var(--bgS)] w-[30%] h-[80%] flex-1 ">
                {chats ?
                    chats.map((chat , index) =>{
                        return  <Chat setAsCurrent={props.setCurrentChat} key={chat.id} receiver={chat.user_2} username={chat.username_2}/>
                       
                    })
                : null}
               
                
            </section>
          
      
     );
}

export default ChatsList;