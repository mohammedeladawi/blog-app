import Home from "pages/Home";
import Login from "pages/Login";
import Posts from "pages/Posts";
import SignUp from "pages/SignUp";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute, RootRoute } from "routes/RouteGuards";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />}>
        <Route index element={<Home />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Route>

      <Route path="/posts" element={<PrivateRoute />}>
        <Route index element={<Posts />} />
        <Route path="create" element={<div>create post page</div>} />
        <Route path=":slug" element={<div>specific post page</div>} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
