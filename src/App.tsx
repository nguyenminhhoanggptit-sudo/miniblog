import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
