import {
    Flex,
    Link,
    Button
} from '@chakra-ui/react'
import { SignOut } from "./signOut.jsx"

export default function Header() {
    return (
        <Flex>
            <Link href="/sign-up">Sign Up</Link>
            <Link href="/sign-in">Sign In</Link>
            <SignOut />
        </Flex>
    )
}