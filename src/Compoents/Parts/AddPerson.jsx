import profileImage from "../../Assets/profile.png"
import { createChatsAPI } from "../../Hooks/Apis";

function AddPerson(props) {


    const addNewPerson = async () =>{
        const response = await createChatsAPI(props.user_id);
        console.log(response);
        
    }
    return ( 
        <div className="w-[100%] h-[110px]  flex mb-2 justify-between   ">
           
           <div className="flex h-full w-5/6   ">

                <div className="h-full w-[85px] min-w-[65px] content-center ms-2">
                    <img src={profileImage} alt="" className="rounded-full  border border-white w-full  h-[80%]" />
                </div>

                <div className="ms-3 mt-4 flex justify-between  w-[50%] ">
                    <h1 className="font-bold"> {props.username}</h1>
                    
                </div>
                
           </div>
          

           <div className="flex h-full w-1/6 ">
                <svg className="text-emerald-700 size-12 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    onClick={addNewPerson}>
                
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
           </div>
       </div>
     );
}

export default AddPerson;