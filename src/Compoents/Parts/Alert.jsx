function Alert(props) {
    return (
        props.show ?
            props.success ?
                <div className="fixed bg-green-300 text-[#23864A] top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-[300px] rounded-md p-2 z-[60]
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline ms-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <h3 className="text-sm inline ms-3">{props.successMessage}</h3>
                    <div></div>
                </div>
                // Otherwise
                :
                <div className="fixed bg-red-300 text-[#782020] top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    w-[300px] rounded-md p-2 z-[60]
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline ms-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>

                    <h3 className="text-sm inline ms-3">{props.errorMessage}</h3>
                    <div></div>
                </div>

            : null
    );
}

export default Alert;