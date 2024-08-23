import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./components/indexPage";
import Layout from "./components/layout";
import Login from "./components/Login/login";
import Register from "./components/Register/Register";
import { UserContextProvider } from "./Provider/UserContext";
import CreatePost from "./components/CreatePost/CreatePost";
import PostPage from "./components/PostPage/PostPage";
import EditPost from "./components/EditPost/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<IndexPage></IndexPage>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/post" element={<CreatePost></CreatePost>}></Route>
          <Route path="/post/:id" element={<PostPage></PostPage>}></Route>
          <Route path="/edit/:id" element={<EditPost></EditPost>}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
