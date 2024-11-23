import { useEffect, useState } from "react";
import Chat from "../Parts/Chat";
import '../../App.css'
import axios from "axios";
function ChatsList(props) {
    
    const [chats,setChats] = useState([]);
    const re = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/users/refresh/`,{
                withCredentials : true
            });

            if(!response.ok){
                console.log(response);
                
                throw new Error(response)
            }else{
                const json =  await response.json();
                setChats(json);
            }
            
            
        } catch (error) {
            console.log(error);
            
        }
    }
    const fetchChats = async () =>{

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/messaging/getChats/`,{
                withCredentials : true
            });

            console.log(response);
            
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
               
                <button onClick={re}>dhgqwhbjdwbajn</button>
            </section>
          
      
     );
}

export default ChatsList;