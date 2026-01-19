import { useContext, useEffect, useState } from "react";
import Chat from "../Parts/Chat";
import '../../App.css'
import axios from "axios";
import { getChatsAPI, subscribeToChatsAPI } from "../../Hooks/APIs";
import GroupChat from "../Parts/GroupChat";
function ChatsList(props) {



    const [chats, setChats] = useState([]);


    useEffect(() => {
        // Subscribe to real-time updates
        const unsubscribe = subscribeToChatsAPI((newChats) => {
            setChats(newChats);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [props.currentMenu]);
    return (

        <section className="bg-[var(--bgS)] w-[90%] h-auto flex-1 overflow-auto  " style={{ scrollbarWidth: "none" }}>
            {chats && chats.length > 0 ?
                chats.map((chat, index) => {
                    return chat.group ?
                        <GroupChat setAsCurrent={props.setCurrentChat} current={props.currentChat} key={index} receiver={chat.chatUser_id} username={chat.chat_name} chat_id={chat.id} />
                        :
                        <Chat setAsCurrent={props.setCurrentChat} current={props.currentChat} key={index} receiver={chat.chatUser_id} username={chat.chat_name} chat_id={chat.id} />

                })
                :
                <div className="flex flex-col items-center mt-10">
                    <h1 className="text-white text-center font-bold">You have no chats yet</h1>
                    <p className="text-gray-400 text-sm mt-2">Search for people to start messaging</p>
                </div>
            }


        </section>


    );
}

export default ChatsList;