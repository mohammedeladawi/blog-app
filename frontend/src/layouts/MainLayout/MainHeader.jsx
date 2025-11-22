import RouteLink from "components/common/RouteLink";
import Header from "components/layouts/Header";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutAsync } from "store/slices/auth/authThunks";

const MainHeader = () => {
  const dispatch = useDispatch();
  return (
    <Header>
      <RouteLink title="Home" path="/" />
      <RouteLink title="Posts" path="/posts" end />
      <RouteLink title="Create Post" path="/posts/create" />
      <Button
        className="ms-3"
        variant="primary"
        onClick={() => dispatch(logoutAsync())}
      >
        Logout
      </Button>
    </Header>
  );
};

export default MainHeader;
