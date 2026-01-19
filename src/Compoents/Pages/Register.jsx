import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase/firebase";
import { registerAPI as registerAPI_Shared } from "../../Hooks/APIs";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
import Alert from "../Parts/Alert";

function Register() {


    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);

    const [alert, setAlert] = useState({ show: false, success: false, message: "" });

    const navigate = useNavigate();
    const registerAPI = async () => {
        setAlert({ show: false, success: false, message: "" }); // Reset alert
        try {
            const email = emailRef.current.value;
            const password = passwordRef.current.value;
            const confirmPassword = confirmPasswordRef.current.value;
            const username = usernameRef.current.value;
            const firstName = firstNameRef.current.value;
            const lastName = lastNameRef.current.value;

            if (password !== confirmPassword) {
                setAlert({ show: true, success: false, message: "Passwords do not match!" });
                return;
            }

            if (!email || !password || !username) {
                setAlert({ show: true, success: false, message: "Please fill in all required fields." });
                return;
            }

            await registerAPI_Shared(firstName, lastName, email, username, password);

            navigate("/login", { state: true });
        } catch (error) {
            console.log("Error Happened", error);
            // Show friendly error message from Firebase
            let errorMessage = error.message;
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Email is already registered.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password should be at least 6 characters.";
            }
            // fallback to raw message if not specific
            setAlert({ show: true, success: false, message: errorMessage });
        }
    };


    return (
        <main className="w-full bg-[var(--bg)] h-full  content-center">
            <Alert show={alert.show} success={alert.success} errorMessage={alert.message} successMessage={alert.message} />
            <div className="bg-[var(--bgS)] max-w-[40%] w-auto  h-auto m-auto p-8 ">

                <form className="text-black ">
                    <h1 className="text-3xl font-bold text-center mb-8 text-white">Create Account</h1>

                    <div className="flex gap-8  ">
                        <input ref={firstNameRef} className="p-2 placeholder:text-center rounded-md w-1/2  outline-none" type="text" placeholder="First Name" name="firstName" />
                        <input ref={lastNameRef} className="p-2 placeholder:text-center rounded-md w-1/2 outline-none" type="text" placeholder="Last Name" name="lastName" />
                    </div>
                    <div className="mt-5  ">
                        <input ref={usernameRef} className="mb-4 p-2  rounded-md w-full outline-none" type="text" name="" placeholder="Username" /><br />
                        <input ref={emailRef} className="p-2 mb-4 rounded-md w-full outline-none" type="email" name="" placeholder="Email" /><br />
                        <input ref={passwordRef} className="p-2   mb-4 rounded-md w-full outline-none" type="password" name="" placeholder="Password" />
                        <input ref={confirmPasswordRef} className="p-2  rounded-md w-full outline-none" type="password" name="" id="" placeholder="Confirm Password" />
                    </div>
                    <p className="text-sm mt-1 ps-1 text-white">You Have Accout? <Link className="underline font-bold" to="/login">Login</Link> </p>

                    <input className="flex justify-self-end max-w-[30%] w-full mt-3 text-white bg-[var(--btn)] p-3 rounded-lg font-bold  
                    hover:bg-[var(--btn-l)] active:bg-[var(--btn)]  hover:scale-110
                    
                    
                    " type="button" value="Create" onClick={registerAPI} />
                </form>


            </div>
        </main>
    );
}

export default Register;