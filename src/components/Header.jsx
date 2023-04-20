import {
    Flex,
    Link,
} from '@chakra-ui/react'
import { SignOut } from "./signOut.jsx"
import { useAuth } from "../contexts/AuthContext"

export default function Header() {
    const { newMessage } = useAuth()
    const token = localStorage.getItem("userToken")
    return (
        <Flex
            gap={15}>
            {token ? <Link href="/users">All Users</Link> : null}
            {token ? <Link href="/feed">All Posts</Link> : null}
            {token ? null : <Link href="/sign-up">Sign Up</Link>}
            {token ? null : <Link href="/sign-in">Sign In</Link>}
            {token ? <Link href="/create-post">Create Post</Link> : null}
            {token ? <Link href="/posts">Posts</Link> : null}
            {!newMessage ? null : <p>New Message</p>}
            {token ? <SignOut /> : null}
        </Flex>
    )
}