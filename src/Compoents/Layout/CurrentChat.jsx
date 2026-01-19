import { useContext, useEffect, useRef, useState } from "react";
import Message from "../Parts/Message";
import Chat_Background from "../../Assets/chat_background.jpeg"
import { UserId } from "../../Contexts/User/UserContext";
import PersonImage from "../../Assets/person_image.jpg"
import { CurrentReceiver } from "../../Contexts/Chats/CureentChatContext";
import Osman from "../../Assets/osman.mp3"
import { sendMessageAPI, subscribeToMessagesAPI } from "../../Hooks/APIs";
import { auth } from "../../firebase/firebase";

function CurrentChat(props) {

    const refInput = useRef(null);
    const refLastMessage = useRef();
    const { userId } = useContext(UserId)
    const currentChatId = props.currentChat;

    const [formatedUserId, setFormatedUserId] = useState()

    const [messages, setMessages] = useState([]);
    const [toggleEmojis, setToggleEmojis] = useState(false);
    const { currentReceiver } = useContext(CurrentReceiver)


    const emojis = ["😂", "😏", "😘", "😝", "🥶", "😡", "😍", "😭", "🥲", "🤣", "☺️", "🤓", "😶‍🌫️", "😵‍💫", "🤤", "🤥", "👋", "🖐", "👌", "✌️", "🤏", "🤟", "🤙", "🫵", "🫱", "👏", "👆", "👈", "👉", "👇", "👍", "👎", "💪"]

    useEffect(() => {
        let unsubscribe = () => { };

        if (currentChatId) {
            unsubscribe = subscribeToMessagesAPI(currentChatId, (newMessages) => {
                setMessages(newMessages);
                // Optional: Play sound on new message if it's not the initial load or check sender
                const audio = new Audio(Osman)
                audio.play().catch(e => console.log("Audio play failed interaction required"));
            });
        }

        return () => {
            unsubscribe();
        };
    }, [currentChatId]);


    const sendMessage = async (e) => {
        e.preventDefault();
        const content = refInput.current.value;
        if (!content) return;

        try {
            await sendMessageAPI(currentChatId, content);
            refInput.current.value = "";
        } catch (error) {
            console.error("Failed to send message", error);
        }
    }

    useEffect(() => {
        if (refLastMessage.current != null && refLastMessage != undefined) {
            refLastMessage.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, userId])


    return (
        currentReceiver ?
            <>
                <section className="fixed  flex w-[70%] h-auto max-h-[103px]  top-0 right-0 flex-1 bg-repeat bg-cover p-2 overflow-auto z-30  bg-[var(--bgS)]
            drop-shadow-md
            ">
                    <div className=" h-full w-[85px] min-w-[65px] content-center ms-2">
                        <img src={PersonImage} alt="" className="rounded-full  border border-white w-full  h-[80%]" />
                    </div>
                    <div className="content-center ms-3">
                        <h1 className="text-3xl "> {currentReceiver}    </h1>
                    </div>

                </section>

                <section className="fixed bottom-[57px] w-[70%] h-auto  top-[102px] right-0 flex-1 bg-repeat bg-cover p-2 overflow-auto  "
                    style={{ backgroundImage: `url(${Chat_Background})` }}
                >

                    {messages?.length ? messages.map((message, index) => {
                        // Use auth.currentUser directly for reliable alignment check
                        const currentUserUid = auth.currentUser?.uid;
                        const isMyMessage = message.sender_id === currentUserUid;

                        if (isMyMessage) {
                            return (<Message key={index} username={message.sender_name} content={message.content} lastMessage={refLastMessage} time={message.sent_time} style={"place-self-end"} />);
                        }
                        else {
                            return (<Message key={index} username={message.sender_name} content={message.content} time={message.sent_time} style={"place-self-start"} />);
                        }
                    }) : <div ref={props.lastMessage} className={" p-3 bg-[var(--bg)] text-white rounded-2xl gap-3 h-max  my-2 w-max max-w-[500px] max-h-auto overflow-x-hidden place-self-center " + props.style} >
                        <span className="w-100  break-all	 ">There are no Messsages </span>

                    </div>
                    }



                </section>

                <section className="fixed w-[70%] h-14 bottom-0 right-0 bg-[var(--btn)] p-2">

                    <form onSubmit={sendMessage} className="flex content-center items-center align-middle h-full ">

                        <svg onClick={() => { setToggleEmojis(!toggleEmojis) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ms-3 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                        </svg>

                        {
                            toggleEmojis ?
                                <div className="  absolute h-20 bg-[var(--btn)] w-60 bottom-16 grid grid-cols-3 place-items-center overflow-y-auto select-none" >
                                    {emojis.map((emoji, index) => {
                                        return <div key={index} className="text-2xl" onClick={() => refInput.current.value += emoji}>{emoji}</div>
                                    })}
                                </div> :
                                null
                        }



                        <input className="outline-none w-[80%] ms-3 p-2" type="text" placeholder="write your message ........" ref={refInput} />
                        <input type="submit" value="send" className="bg-[var(--bgS)] ms-3 w-20 p-2 rounded-full text-white cursor-pointer disabled:opacity-50" />
                    </form>

                </section>
            </>
            :
            <div className="fixed  flex-1 w-[70%] h-full   top-0 right-0 text-center  content-center  bg-repeat bg-cover p-2 overflow-auto z-30  bg-[var(--bgS)]
            drop-shadow-md opcacity-10 bg-opacity-50 z-0
            "   style={{ backgroundImage: `url(${Chat_Background})` }}>
                <h1 className="  text-[var(--bg)] text-3xl font-bold">Chatly App </h1>
                <p className=" text-gray-500 text-lg font-bold">Send and receive messages without keeping your phone  online</p>
            </div>


    );
}

export default CurrentChat;