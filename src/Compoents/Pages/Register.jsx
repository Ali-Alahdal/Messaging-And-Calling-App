import { useRef } from "react";
import { Link } from "react-router-dom";
function Register() {


    const passwordRef = useRef(null);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);

    const registerAPI = async () =>{
        console.log(usernameRef.current.value , emailRef.current.value ,passwordRef.current.value);
        
        try {
            const response = await fetch("http://127.0.0.1:8000/users/register/" ,{
                headers: {
                    "Content-Type": "application/json",
                },
                method : "POST",
                body : JSON.stringify({
                    "username" : usernameRef.current.value,
                    "password": passwordRef.current.value,
                    "email" : emailRef.current.value
                })
            })
            console.log(response);
            
            if(!response.ok){
                throw new Error("Something Worng" , response)
            }
            else{
                console.log(await response.json());
                
            }
        } catch (error) {
            console.log("Error Happend" ,error )
            
        }
    }


    return ( 
        <main className="w-full bg-[var(--bg)] h-full  content-center">
            
            <div className="bg-[var(--bgS)] max-w-[40%] w-auto  h-auto m-auto p-8 ">

                <form className="text-black ">
                    <h1 className="text-3xl font-bold text-center mb-8 text-white">Create Account</h1>

                    <div className="flex gap-8  ">
                        <input className="p-2 placeholder:text-center rounded-md w-1/2  outline-none" type="text" placeholder="First Name" name="firstName" />
                        <input className="p-2 placeholder:text-center rounded-md w-1/2 outline-none" type="text" placeholder="Last Name" name="lastName" />
                    </div>
                    <div className="mt-5  ">
                        <input ref={usernameRef} className="mb-4 p-2  rounded-md w-full outline-none" type="text" name=""  placeholder="Username" /><br />
                        <input ref={emailRef} className="p-2 mb-4 rounded-md w-full outline-none" type="email" name=""  placeholder="Email" /><br />
                        <input ref={passwordRef} className="p-2   mb-4 rounded-md w-full outline-none" type="password" name=""  placeholder="Password"/>
                        <input className="p-2  rounded-md w-full outline-none" type="password" name="" id="" placeholder="Confirm Password"/>
                    </div>
                    <p className="text-sm mt-1 ps-1 text-white">You Have Accout? <Link className="underline font-bold" to="/">Login</Link> </p>
                    
                    <input className="flex justify-self-end max-w-[30%] w-full mt-3 text-white bg-[var(--btn)] p-3 rounded-lg font-bold  
                    hover:bg-[var(--btn-l)] active:bg-[var(--btn)]  hover:scale-110
                    
                    
                    " type="button" value="Create" onClick={registerAPI} />
                </form>


            </div>
        </main>
    );
}

export default Register;