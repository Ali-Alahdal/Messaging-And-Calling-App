import { useEffect, useRef } from "react";
import { json } from "react-router-dom";


function CurrentChat(props ) {

    const refInput = useRef(null);
    const url = `ws://127.0.0.1:8000/ws/chat/${24}`;
    const ws = new WebSocket(url)
    console.log();
    
    ws.onopen = (event) =>{
        console.log("Connection is Opend");
        console.log(event);
        
    }
    

    ws.onmessage = (event) =>{
        // const json  = JSON.parse(event.data)
        console.log(event.data);
        
    }
    ws.onclose = () =>{
        console.log("Connection Closed!");
        console.log(event);
    }

    ws.onerror = (event) =>{
        console.log(event);
        
    }

    const broadcast = (e) =>{
        e.preventDefault();
        ws.send({
             "text": refInput.current.value
            })
        // console.log("Soukda");
        
    }
    return ( 
        <>
        

        <section className="fixed w-[70%] h-14 bottom-0 right-0 bg-[var(--btn)] p-2">
            
            <form onSubmit={broadcast} className="flex content-center items-center align-middle h-full ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ms-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>

                <input className="outline-none w-[80%] ms-3 p-2" type="text" placeholder="write your message ........"  ref={refInput}  />
                <input type="submit" value="send" className="bg-[var(--bgS)] ms-3 w-20 p-2 rounded-full text-white" />
            </form>
          
        </section>
        </>
     );
}

export default CurrentChat;