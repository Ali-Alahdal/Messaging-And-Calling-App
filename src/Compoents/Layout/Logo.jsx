import { getProfileAPI, logoutAPI } from "../../Hooks/APIs";
import { useNavigate } from "react-router-dom";
import Person_Image from "../../Assets/person_image.jpg";
import { useEffect , useContext } from "react";
import { UserId , Username } from "../../Contexts/User/UserContext";
function Logo() {

    const navigator = useNavigate();


    const {userId , setUserId}  = useContext(UserId)
    const {username , setUsername}  = useContext(Username)

    const logout = async () => {
        const response = await logoutAPI();
        if(response.success){
            navigator("/login")
        }
        
    }

    useEffect(() =>{
        const getProfile = async () => {
            const response = await getProfileAPI();    
            if(!response.success){
                navigator("/login")
            }else{
                // console.log(response.user_id);
                
                setUserId(response.user_id)
                setUsername(response.username)
            }
            
        }

        getProfile();
    },[])
    return ( 
        <>
            <div className="relative w-[30%] bg-[var(--btn-l)]  text-[#eee8f6] h-[20%] flex ">

                <div className="h-full  content-center ms-2">
                    <img src={Person_Image} alt="" className="rounded-full w-full  h-[70%] border-white border-2" />
                </div>

                <div className="h-full  content-center ms-2 max-w-[200px] ">
                    <h1 className="text-lg font-bold"> Welcome, { username?.toUpperCase()} </h1>
                </div>

                <div className="absolute right-2 bottom-2 rounded-xl   ">
                    <button onClick={logout} className="rounded-xl  text-sm font-bold bg-red-500 p-2 mt-2">Logout</button>
                </div>
               
            </div>
        </>
     );
}

export default Logo;
