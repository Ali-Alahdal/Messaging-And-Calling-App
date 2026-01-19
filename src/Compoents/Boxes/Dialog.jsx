import { useRef, useState } from "react";
import { useEffect } from "react";
import { createChatsAPI, getChatsAPI } from "../../Hooks/APIs";
import Chat from "../Parts/Chat";
import Alert from "../Parts/Alert";


function Dialog(props) {

    const refDiv = useRef(null);
    const refDiv2 = useRef(null);
    const refName = useRef(null);

    const [chats, setChats] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(props.active)
    const [alertData, setAlertData] = useState({ show: false, success: false, message: "" });

    useEffect(() => {
        document.getElementById("root").append(refDiv2.current);
        document.getElementById("root").append(refDiv.current);

    }, [props.active])

    useEffect(() => {
        const fetchChats = async () => {
            const response = await getChatsAPI();
            setChats(response)

        }

        fetchChats();
    }, []);



    const handleChange = (event) => {
        const { name, checked } = event.target;
        setSelectedUsers({ ...selectedUsers, [name]: checked });


    };



    const createGroup = async () => {
        const groupName = refName.current.value.trim();

        if (!groupName) {
            setAlertData({ show: true, success: false, message: "Group name is required!" });
            setTimeout(() => setAlertData({ ...alertData, show: false }), 3000);
            return;
        }

        try {
            const response = await createChatsAPI(
                groupName,
                Object.keys(selectedUsers).filter((key) => selectedUsers[key]),
                true // isGroup
            );
            if (response.success) {
                setAlertData({ show: true, success: true, message: "Group created successfully!" });
                // Close dialog after successful creation
                setTimeout(() => {
                    setAlertData({ ...alertData, show: false });
                    props.setIsActive(false);
                    // Optionally clear input
                    refName.current.value = "";
                    setSelectedUsers({});
                }, 1500);
            }
        } catch (error) {
            setAlertData({ show: true, success: false, message: "Failed to create group." });
            setTimeout(() => setAlertData({ ...alertData, show: false }), 3000);
        }

    }


    useEffect(() => {
        if (props.active) {
            refDiv.current.classList.remove("hidden");
            refDiv2.current.classList.remove("hidden");
        } else {
            refDiv.current?.classList.add("hidden");
            refDiv2.current?.classList.add("hidden");
        }


    }, [props.active,])


    return (

        <>
            <div ref={refDiv2} onClick={() => props.setIsActive(false)} className="fixed w-full h-full top-0  bg-opacity-20 bg-black z-40 ">

            </div>

            <div ref={refDiv} className="fixed w-1/2 h-1/2 top-[25%] left-[25%]  bg-[var(--bgS)] overflow-y-auto  border-2 border-blue-100 rounded-xl  p-1 z-50"
                style={{ scrollbarWidth: "none" }} >

                <Alert show={alertData.show} success={alertData.success} successMessage={alertData.message} errorMessage={alertData.message} />

                <div className="relative w-100 h-20 p-2 text-center bg-[var(--bg)] rounded-xl ">
                    <h1 className="font-bold text-xl text-white ">   New Group  </h1>
                    <div className="p-2 ">

                        <input ref={refName} className="text-center outline-none" type="text" placeholder="Group Name" id="group_name" />
                    </div>

                </div>

                {
                    chats?.length ? chats.map((chat, index) => {
                        return (
                            !chat.group && chat.other_user_id ?
                                <form key={index} className="flex border-b border-white">
                                    <div className="content-center  w-full ">
                                        <Chat username={chat.chat_name} chat_id={chat.chat_id} />
                                    </div>

                                    <div className="content-center     ">
                                        <input className="text-3xl w-12 h-5 " type="checkbox" name={chat.other_user_id} value={chat.other_user_id} onChange={handleChange} />

                                    </div>

                                </form> : null
                        )

                    }) : null
                }

                <div onClick={createGroup} className=" bg-green-700 sticky bottom-3 place-self-end me-2 text-white p-2 rounded-full w-10" >
                    <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </div>
            </div>
        </>

    );
}

export default Dialog;