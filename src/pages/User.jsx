import { useState, useEffect } from "react";


export function User() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    console.log("user>>>>", user)
    return (<>
        <div >
            <div>{user.image && (
                <img style={{ width: "20px", height: "20px", borderRadius: "50%" }}
                    src={`http://localhost:3001/${user.image}`}
                    alt='img'
                />
            )} {user.firstName} {user.lastName}</div>
        </div>

    </>)
}