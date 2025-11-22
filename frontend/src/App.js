import Login from "pages/Login";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "routes/RouteGuards";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route index element={<div>main page</div>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<div>registeration page</div>} />
      </Route>

      <Route path="posts" element={<PrivateRoute />}>
        <Route index element={<div>posts page</div>} />
        <Route path=":slug" element={<div>specific post page</div>} />
        <Route path="create" element={<div>create post page</div>} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
