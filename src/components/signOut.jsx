import {
    Button
} from '@chakra-ui/react'

export function SignOut() {

    const signOut = () => {
        localStorage.removeItem("userToken")
        localStorage.removeItem("user")
    }
    return <Button onClick={signOut}>Sign Out</Button>
}

