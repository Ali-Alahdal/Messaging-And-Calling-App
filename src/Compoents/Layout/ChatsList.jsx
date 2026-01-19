import { useContext, useEffect, useState } from "react";
import Chat from "../Parts/Chat";
import '../../App.css'
import axios from "axios";
import { getChatsAPI } from "../../Hooks/APIs";
import GroupChat from "../Parts/GroupChat";
function ChatsList(props) {



    const [chats, setChats] = useState([]);


    useEffect(() => {
        const fetchChats = async () => {
            const response = await getChatsAPI();
            setChats(response)


        }

        fetchChats();
    }, [props.currentMenu])
    return (

        <section className="bg-[var(--bgS)] w-[90%] h-auto flex-1 overflow-auto  " style={{ scrollbarWidth: "none" }}>
            {chats ?

                chats.map((chat, index) => {
                    return chat.group ?
                        <GroupChat setAsCurrent={props.setCurrentChat} current={props.currentChat} key={index} receiver={chat.chatUser_id} username={chat.chat_name} chat_id={chat.id} />
                        :
                        <Chat setAsCurrent={props.setCurrentChat} current={props.currentChat} key={index} receiver={chat.chatUser_id} username={chat.chat_name} chat_id={chat.id} />

                })
                : null}


        </section>


    );
}

export default ChatsList;