import { useEffect, useState } from "react";

import AddPerson from "../Parts/AddPerson";



function AddPepole() {

    const [chats , setChats] = useState([]);
    const [isConnected , setIsConnected] = useState(false)

    const url = `ws://127.0.0.1:8000/ws/search/`;
    const ws2 = new WebSocket(url)

    useEffect(() =>{    
        ws2.onopen = (event) =>{
            console.log("Connection is Opend Search");
            // console.log(event);
            // setIsConnected(true)
        }

        
        ws2.onmessage = async (event) =>{
            // const json  = JSON.parse(event.data)
            console.log(event);
            setChats(JSON.parse( event.data))
        
           
        }
        ws2.onclose = () =>{
            console.log("Connection Closed! Search");
            console.log(event);
        //    setIsConnected(false)
        } 
    
        ws2.onerror = (event) =>{
            console.log(event);
            // setIsConnected(false)
           
            
        }
        
      

    }, [ws2.onmessage])


    const sendPromot= (data) =>{
        if(ws2.readyState === 1){
            ws2.send(
                data
            )
        }
            
        
       
        
    }
    // useEffect(()=>{

        
       
      
       
    // },[promot])

    return ( 
        <section className="w-[90%] bg-[var(--bgS)]  h-auto flex-1 overflow-auto  " style={{scrollbarWidth:"none"}}>
               
               <div className="flex bg-[var(--bg)]   p-3 text-center items-center   ">

                    <svg className="size-9 place-self-center text-white me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                <input onChange={(event) => {  sendPromot(event.target.value) } } className="p-2 outline-none rounded-md" type="search" name="" id="" placeholder="type   username..."/>
               </div>

               <div>
                {
                    chats.map((chat, index) =>{
                        return <AddPerson key={index}  username={chat.username} user_id={chat.id}  />
                    })
                }
                
               
               </div>
             
        </section>
     );
}

export default AddPepole;