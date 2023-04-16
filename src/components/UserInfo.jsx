import axios from "axios"
import { useState, useEffect } from "react";

export default function UserInfo(id) {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/users", {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        }).then((res) => {
            setUsers(res.data.users)
        })
            .catch((err) => {
                console.log(err)
            });
    }, [])
    useEffect(() => {
        const findUser = () => {
            const findMyUser = users.find(user => user._id === id.id);
            setUser(findMyUser);
        }
        findUser();
    }, [users, id]);

    return (<>
        <div>
            {/* <div>{user.image && (
                <img style={{ width: "20px", height: "20px", borderRadius: "50%" }}
                    src={`http://localhost:3001/${user.image}`}
                    alt='img'
                />
            )} {user.firstName} {user.lastName}</div> */}
            {user ? <div>{user.firstName}  {user.lastName}</div> : "user"}
        </div>
    </>)

}





