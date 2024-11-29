import { useEffect, useRef, useState } from "react";
import { json } from "react-router-dom";
import Message from "../Parts/Message";
import Chat_Background from "../../Assets/chat_background.jpeg"

function CurrentChat(props ) {

    const refInput = useRef(null);
    const refLastMessage = useRef();
  


    const url = `ws://127.0.0.1:8000/ws/chat/${props.currentChat}`;
    const ws = new WebSocket(url)
   

    const [messages , setMessages] = useState([]);
    const [toggleEmojis , setToggleEmojis] = useState(false);
    
    
    
    const emojis = ["😂" , "😏", "😘", "😝", "🥶",  "😡" , "😍" ,"😭" , "🥲" , "🤣" , "☺️" , "🤓" , "😶‍🌫️" , "😵‍💫" , "🤤" , "🤥", "👋" , "🖐" , "👌" , "✌️" , "🤏" , "🤟" , "🤙" , "🫵" , "🫱" , "👏" , "👆" , "👈" , "👉" , "👇" , "👍" , "👎" , "💪"]
    useEffect(() =>{
        ws.onopen = (event) =>{
            console.log("Connection is Opend");
            console.log(event);
            
        }
        ws.onmessage = async (event) =>{
            const json  = JSON.parse(event.data)
            console.log(messages);
            
           setMessages(  
            
            JSON.parse(event.data)
            
           )
            // messages.push(JSON.parse(event.data))
           
        }
        ws.onclose = () =>{
            console.log("Connection Closed!");
            // console.log(event);
        }
    
        ws.onerror = (event) =>{
            console.log(event);
            
        }
        
      

    },[ws.onmessage, ws.onopen, props.currentChat ])
    
   
  

    const sendMessage = (e) =>{
        e.preventDefault();
        ws.send( refInput.current.value )
        
        // setMessages(...messages , {"content"  :refInput.current.value})
    
        refInput.current.value = null;
        
    }

    useEffect(() =>{
        if(refLastMessage.current != null && refLastMessage != undefined ){
            refLastMessage.current.scrollIntoView({ behavior: "smooth" });  
            // console.log(refLastMessage);
            
        }
        
    },[messages ])


    return ( 
        <>
        
        <section  className="fixed bottom-[57px] w-[70%] h-auto  top-0 right-0 flex-1 bg-repeat bg-cover p-2 overflow-auto  "
            style={{backgroundImage:`url(${Chat_Background})`}}
        >
            {messages?.length ?  messages.map((message , index) =>{
                const lastMessage = messages.length;
                 if (lastMessage == index +1 ){
                    return (<Message key={index} content={message.content} lastMessage={refLastMessage} style={"place-self-end"} /> );
                 }
                 else{
                    return (<Message key={index} content={message.content} l style={"place-self-start"} />  );
                 }
            }) : <div ref={props.lastMessage} className={" p-3 bg-[var(--bg)] text-white rounded-2xl gap-3 h-max  my-2 w-max max-w-[500px] max-h-auto overflow-x-hidden place-self-center " + props.style} >
                    <span className="w-100  break-all	 ">There are no Messsages </span>
                    
                    </div>
        }
          

           
        </section>

        <section className="fixed w-[70%] h-14 bottom-0 right-0 bg-[var(--btn)] p-2">
            
            <form onSubmit={sendMessage} className="flex content-center items-center align-middle h-full ">

               
                <svg  onClick={() =>{setToggleEmojis(!toggleEmojis)}}   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ms-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
                
                {
                    toggleEmojis ?
                    <div  className="  absolute h-20 bg-[var(--btn)] w-60 bottom-16 grid grid-cols-3 place-items-center overflow-y-auto select-none" >
                        {emojis.map((emoji ,index) =>{
                            return <div key={index} className="text-2xl" onClick={() => refInput.current.value += emoji}>{emoji}</div>
                        })}
                    </div> : 
                    null
                }
               


                <input className="outline-none w-[80%] ms-3 p-2" type="text" placeholder="write your message ........"  ref={refInput}  />
                <input type="submit" value="send" className="bg-[var(--bgS)] ms-3 w-20 p-2 rounded-full text-white" />
            </form>
          
        </section>
        </>
     );
}

export default CurrentChat;