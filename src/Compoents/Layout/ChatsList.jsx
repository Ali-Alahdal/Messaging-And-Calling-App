import { useEffect } from "react";
import Chat from "../Parts/Chat";

function ChatsList() {
    

    const f = async () =>{
        try {
            const r = await fetch("http://127.0.0.1:8000/try/api/");
            console.log(await r.json());
            
        } catch (error) {
            
        }
    }

    useEffect(() =>{
        f()
    },[])
    return ( 
       
            <section className="bg-[#3d52a1] w-[30%] h-[80%] ">
                <Chat id={1}/>
                <Chat id={2}/>
                <Chat id={3 }/>
            </section>
          
      
     );
}

export default ChatsList;