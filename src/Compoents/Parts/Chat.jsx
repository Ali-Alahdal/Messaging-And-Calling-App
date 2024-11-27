import profileImage from "../../Assets/profile.png"

function Chat(props) {

    return ( 
        <>
            <div className="w-full h-1/6  flex mb-2  " onClick={() => {props.setAsCurrent(props.chat_id);
             }}>
                
                <div className="h-full w-[70px] min-w-[65px] content-center ms-2">
                    <img src={profileImage} alt="" className="rounded-full w-full  h-[90%]" />
                </div>
                <div className="ms-3 mt-3 flex justify-between  w-3/4  ">
                    <h1 className="font-bold"> {props.username}</h1>
                    <h1 className="me-3 text-xs mt-1"> 11:00 </h1>
                </div>
            </div>
        </>
     );
}

export default Chat;