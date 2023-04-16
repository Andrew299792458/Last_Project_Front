import {
    Flex,
    Link,
    Button
} from '@chakra-ui/react'
import { SignOut } from "./signOut.jsx"

export default function Header() {
    return (
        <Flex
            gap={15}>
            <Link href="/users">All Users</Link>
            <Link href="/feed">All Posts</Link>
            <Link href="/sign-up">Sign Up</Link>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/create-post">Create Post</Link>
            <Link href="/posts">Posts</Link>
            <SignOut />
        </Flex>
    )
}