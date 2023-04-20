import {
    Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"



export function SignOut() {

    const { setUser } = useAuth()

    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem("userToken")
        localStorage.removeItem("user")
        navigate("/sign-in")
        setUser(null)
    }
    return <Button onClick={signOut}>Sign Out</Button>
}

