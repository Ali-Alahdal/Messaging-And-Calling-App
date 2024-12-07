import Logo from "../Layout/Logo";
import ChatsList from "../Layout/ChatsList";
import CurrentChat from "../Layout/CurrentChat";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Main() {

    const navigate = useNavigate();

    const [currentChat , setCurrentChat] = useState();


    

    useEffect(() =>{
        console.log(currentChat);
        
    },[currentChat])
    return ( <>
        
        <Logo />
        <ChatsList setCurrentChat={setCurrentChat} />
        <CurrentChat receiver={currentChat} />
    </> );
}

export default Main;