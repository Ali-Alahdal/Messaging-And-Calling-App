import { useRef, useState } from "react";
import { useEffect } from "react";
import { createChatsAPI, getChatsAPI } from "../../Hooks/Apis";
import Chat from "../Parts/Chat";


function Dialog(props) {

    const refDiv = useRef(null);
    const refDiv2 = useRef(null);
    const refName = useRef(null);
    
    const [chats , setChats] = useState([]);
    const [selectedUsers , setSelectedUsers] = useState(props.active)
    
    useEffect(() =>{
        document.getElementById("root").append(refDiv2.current);
        document.getElementById("root").append(refDiv.current);
    
    },[props.active ])

    useEffect(() =>{
        const fetchChats = async () =>{
            const response = await getChatsAPI();
            setChats(response)
            console.log(response);
            
        }
    
        fetchChats();
    },[]);


    
    const handleChange = (event) => {
        const { name, checked } = event.target;
        setSelectedUsers({ ...selectedUsers, [name]: checked });

        console.log(event.target.value);
        
    };

   

    const createGroup = async () =>{
        const response = await createChatsAPI(
            refName.current.value,
            Object.keys(selectedUsers).filter((key) => selectedUsers[key])
        );
        console.log(response);
        
    }


    useEffect(() =>{
        if(props.active){
            refDiv.current.classList.remove("hidden");
            refDiv2.current.classList.remove("hidden");
            console.log(refDiv);
            console.log("works 2");
        }else{
            refDiv.current?.classList.add("hidden");
            refDiv2.current?.classList.add("hidden");
        }
        
        
    },[props.active , ])
   
   
    return ( 
        
        <>
            <div ref={refDiv2} onClick={() => props.setIsActive(false)}  className="fixed w-full h-full top-0  bg-opacity-20 bg-black ">

            </div>

            <div ref={refDiv} className="fixed w-1/2 h-1/2 top-[25%] left-[25%]  bg-[var(--bgS)] overflow-y-auto  border-2 border-blue-100 rounded-xl  p-1"
            style={{scrollbarWidth:"none"}} >

                <div className="relative w-100 h-20 p-2 text-center bg-[var(--bg)] rounded-xl ">
                    <h1  className="font-bold text-xl text-white ">   New Group  </h1>
                    <div className="p-2 ">
                    
                    <input ref={refName} className="text-center outline-none" type="text" placeholder="Group Name" id="group_name" />
                </div>
            
            </div>

            {
              chats?.length ? chats.map((chat , index) =>{
                    return (
                        <form   key={index} className="flex border-b border-white">
                            <div className="content-center  w-full ">   
                                <Chat    username={chat.chat_name} chat_id={chat.chat_id} />
                            </div>
                        
                            <div   className="content-center     ">
                                <input className="text-3xl w-12 h-5 "  type="checkbox" name={chat.chatUser_id} value={chat.chatUser_id}  onChange={handleChange}/>
                                
                            </div>
                            
                        </form>
                    ) 
                  
                })   : null
            }

            <div onClick={createGroup} className=" bg-green-700 sticky bottom-3 place-self-end me-2 text-white p-2 rounded-full w-10" >
                        <svg  className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>
            </div>
        </> 

        );
}

export default Dialog;