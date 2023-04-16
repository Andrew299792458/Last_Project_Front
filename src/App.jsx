import { ChakraProvider } from '@chakra-ui/react'
import Profile from "./pages/profile.jsx"
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn.jsx"
import { SignUp } from "./pages/SignUp.jsx";
import { AllPosts } from './pages/feed.jsx';
import Header from "./components/Header.jsx"
import { AuthProvider } from "./contexts/AuthContext"
import { CreatePost } from './pages/post.jsx';
import { UserPosts } from './pages/userPosts.jsx';
import { AllUsers } from "./pages/Users.jsx"

function App() {

  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/users" element={<AllUsers />} />
          <Route path="/feed" element={<AllPosts />} />
          <Route path="/posts" element={<UserPosts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/*" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>

  );
}

export default App;
