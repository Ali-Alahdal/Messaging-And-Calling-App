import Logo from "../Layout/Logo";
import ChatsList from "../Layout/ChatsList";
import CurrentChat from "../Layout/CurrentChat";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Layout/Menu";
import AddPepole from "../Layout/AddPepole";
function Main() {

    const navigate = useNavigate();

    const [currentChat , setCurrentChat] = useState();


    
    const [currentMenu , setCurrentMenu] = useState("chats");
    useEffect(() =>{
        console.log(currentChat);
        
    },[currentChat])
    return ( <>
         <Logo />
        <div className="flex w-[30%] h-[80%]">
           
            <Menu setCurrentMenu={setCurrentMenu} />
            {
                currentMenu == "chats" ? 
                <ChatsList setCurrentChat={setCurrentChat} currentChat={currentChat} currentMenu={currentMenu} />  
                : null  
                
            }
            

            {
                currentMenu == "addPepole" ?
                 <AddPepole /> :null
            }
        </div>
       
       
        <CurrentChat currentChat={currentChat} />
    </> );
}

export default Main;