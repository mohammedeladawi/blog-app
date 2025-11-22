import RouteLink from "components/common/RouteLink";
import Header from "components/layouts/Header";

const AuthHeader = () => {
  return (
    <Header>
      <RouteLink path="/" title="Home" />
      <RouteLink path="/login" title="Login" />
      <RouteLink path="/register" title="Sign Up" />
    </Header>
  );
};

export default AuthHeader;
