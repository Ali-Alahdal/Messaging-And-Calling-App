import { useContext, useEffect, useRef } from "react";
import profileImage from "../../Assets/person_image.jpg"
import { CurrentReceiver } from "../../Contexts/Chats/CureentChatContext";

function Chat(props) {
    const refDiv = useRef(null);
    const {setCurrentReceiver} = useContext(CurrentReceiver);
    useEffect(() =>{
        if(props.current == props.chat_id){
            refDiv.current.classList.add("bg-[var(--bg)]");
        }else{
            refDiv.current.classList.remove("bg-[var(--bg)]");
        }
    }, [props.current])
    return ( 
        <>
            <div ref={refDiv} className={"w-full flex my-2 py-5 " } onClick={() => {props.setAsCurrent(props.chat_id); setCurrentReceiver(props.username) }}>
                
                <div className="h-full w-[70px] min-w-[65px] content-center ms-2">
                    <img src={profileImage} alt="" className="rounded-full w-full  h-[90%] border-white border-2" />
                </div>
                <div className="ms-3 mt-3 flex justify-between  w-3/4  ">
                    <h1 className="font-bold"> {props.username}</h1>
                    
                </div>
            </div>
        </>
     );
}

export default Chat;