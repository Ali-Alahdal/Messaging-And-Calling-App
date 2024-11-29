import { useContext, useEffect, useState } from "react";
import Chat from "../Parts/Chat";
import '../../App.css'
import axios from "axios";
import { getChatsAPI } from "../../Hooks/Apis";
import { AccessToken } from "../../Contexts/User/AuthContext";
function ChatsList(props) {
    
    const {token , setToken} = useContext(AccessToken)

    const [chats,setChats] = useState([]);
    const re = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/refresh/', {}, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                },
              });

            if(!response.ok){
                console.log(response);
                throw new Error(response)
            }else{
                const json =  await response.json();
                console.log(json);
            }
            
            
        } catch (error) {
            console.log(error);
            
        }
    }
   
    useEffect(() =>{
        const fetchChats = async () =>{
            const response = await getChatsAPI();
            setChats(response)
            console.log(response);
            
        }
    
        fetchChats();
    },[props.currentMenu ])
    return ( 
       
            <section className=" bg-[var(--bgS)] w-[90%] h-auto flex-1  ">
                {chats ?
                    chats.map((chat , index) =>{
                        return  <Chat setAsCurrent={props.setCurrentChat} key={index} receiver={chat.chatUser_id} username={chat.chat_name} chat_id={chat.chat_id} />
                       
                    })
                : null}
               
                <button onClick={re}>dhgqwhbjdwbajn</button>
            </section>
          
      
     );
}

export default ChatsList;