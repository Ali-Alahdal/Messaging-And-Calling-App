import { useEffect, useState } from "react";
import AddPerson from "../Parts/AddPerson";
import { searchUsersAPI } from "../../Hooks/APIs";

function AddPepole() {

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.trim()) {
                try {
                    const results = await searchUsersAPI(searchTerm);
                    setUsers(results);
                } catch (error) {
                    console.error("Error searching users:", error);
                }
            } else {
                setUsers([]);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <section className="w-[90%] bg-[var(--bgS)]  h-auto flex-1 overflow-auto  " style={{ scrollbarWidth: "none" }}>

            <div className="flex bg-[var(--bg)]   p-3 text-center items-center   ">

                <svg className="size-9 place-self-center text-white me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 outline-none rounded-md"
                    type="search"
                    placeholder="Type username..."
                    value={searchTerm}
                />
            </div>

            <div>
                {
                    !searchTerm ? (
                        <h1 className="text-white text-center mt-4">Search for someone</h1>
                    ) : users.length === 0 ? (
                        <h1 className="text-white text-center mt-4">We couldn't find the username</h1>
                    ) : (
                        users.map((user) => {
                            return <AddPerson key={user.id} username={user.username} user_id={user.id} />
                        })
                    )
                }

            </div>

        </section>
    );
}

export default AddPepole;