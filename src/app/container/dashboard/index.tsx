import { Layout, Image, Button } from "antd";
import React from "react";
import { AppLogo } from "../../components/logo";
import { SideMenu } from "../../components/side-menu";
import { useAppDispatch, useAppSelector } from "../../slice";
import { logout } from "../../slice/auth";

interface Props {
  children: JSX.Element;
}
export const AppDashboard: React.FC<Props> = ({ children }) => {
  const { user, authenticated } = useAppSelector((s) => s.authReducer);
  const dispatch = useAppDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };
  return (
    <div className="home-wrapper">
      <Layout.Header>
        <AppLogo />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginInlineEnd: "20px",
          }}
        >
          {authenticated && (
            <Button size="large" danger type="default" onClick={logoutUser}>
              Logout
            </Button>
          )}
        </div>
      </Layout.Header>
      <div className="app-container">
        {user && authenticated && (
          <div className="left">
            <SideMenu role={user?.role || ""} />
          </div>
        )}
        <div className="right">{children}</div>
      </div>
    </div>
  );
};
