import { useContext, useEffect, useRef, useState } from "react";
import { json, Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "../Parts/Alert";
import { loginAPI } from "../../Hooks/Apis";


function Login() {

    const { state } = useLocation();

    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const navigate = useNavigate();
    
    
    const [showAlert , setShowAlert] = useState(false);

    const callLogin = async () =>{
      
        const response = await loginAPI(emailRef.current.value , passwordRef.current.value );
        if(response.success){
           
            navigate("/")
        }else{
       
            setShowAlert(true);
        }
       
     
    }

    


    return ( 
        <>
        <Alert show={state} success={state} successMessage = " Your Account Has Been Created. " />
        <Alert show={showAlert} success={false} errorMessage="Email or Password is not valid!"  />
        <main className="w-full bg-[var(--bg)] h-full  content-center">
            
            <div className="bg-[var(--bgS)] max-w-[40%] w-auto  h-auto m-auto p-8 ">

                <form className="text-black ">
                    <h1 className="text-3xl font-bold text-center mb-8 text-white">Login</h1>

                  
                    <div className="mt-5  ">
                        <input ref={emailRef} className="mb-4 p-2  rounded-md w-full outline-none" type="text" name=""  placeholder="Email" /><br />
                        <input ref={passwordRef} className="p-2   mb-4 rounded-md w-full outline-none" type="password" name=""  placeholder="Password"/>
                    </div>
                    <p className="text-sm mt-1 ps-1 text-white">You Don't Have Accout? <Link className="underline font-bold" to="/register">Create Account</Link> </p>
                    
                    <input className="flex justify-self-end max-w-[30%] w-full mt-3 text-white bg-[var(--btn)] p-3 rounded-lg font-bold  
                    hover:bg-[var(--btn-l)] active:bg-[var(--btn)]  hover:scale-110
                    
                    
                    " type="button" value="Create" onClick={callLogin} />
                </form>


            </div>
        </main>
        </>
    
    );
}

export default Login;