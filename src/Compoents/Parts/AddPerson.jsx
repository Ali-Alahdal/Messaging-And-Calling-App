import PersonImage from "../../Assets/person_image.jpg"
import { createChatsAPI } from "../../Hooks/APIs";
import { useState } from "react";
import Alert from "../Parts/Alert";

function AddPerson(props) {
    const [alertData, setAlertData] = useState({ show: false, success: false, message: "" });


    const addNewPerson = async () => {
        try {
            const response = await createChatsAPI(props.username, [props.user_id]);
            if (response.success) {
                setAlertData({ show: true, success: true, message: response.id ? "Chat created!" : "Chat already exists!" });
                setTimeout(() => setAlertData({ ...alertData, show: false }), 3000);
            }
        } catch (error) {
            setAlertData({ show: true, success: false, message: "Failed to add person." });
            setTimeout(() => setAlertData({ ...alertData, show: false }), 3000);
        }

    }
    return (
        <div className="w-[100%] h-[110px]  flex mb-2 justify-between   ">
            <Alert show={alertData.show} success={alertData.success} successMessage={alertData.message} errorMessage={alertData.message} />

            <div className="flex h-full w-5/6   ">

                <div className="h-full w-[85px] min-w-[65px] content-center ms-2">
                    <img src={PersonImage} alt="" className="rounded-full  border border-white w-full  h-[80%]" />
                </div>

                <div className="ms-3 mt-4 flex justify-between  w-[50%] ">
                    <h1 className="font-bold"> {props.username}</h1>

                </div>

            </div>


            <div className="flex h-full w-1/6 ">
                <svg className="text-emerald-700 size-12 m-auto cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    onClick={addNewPerson}>

                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </div>
        </div>
    );
}

export default AddPerson;