import { ChakraProvider } from '@chakra-ui/react'
import Profile from "./pages/profile.jsx"
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn.jsx"
import { SignUp } from "./pages/SignUp.jsx";
import Header from "./components/Header.jsx"
import { AuthProvider } from "./contexts/AuthContext"


function App() {

  

  return (
    <ChakraProvider>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>

  );
}

export default App;
