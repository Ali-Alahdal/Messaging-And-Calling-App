import Chat from "../Parts/Chat";

function ChatsList() {
    return ( 
       
            <section className="bg-[#3d52a1] w-[30%] h-[80%] ">
                <Chat id={1}/>
                <Chat id={2}/>
                <Chat id={3 }/>
            </section>
          
      
     );
}

export default ChatsList;