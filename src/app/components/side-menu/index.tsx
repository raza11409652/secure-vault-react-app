import {
  LinkOutlined,
  LockFilled,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { NavLink } from "react-router-dom";
// import { useAppSelector } from "../../slice";
import "./side-menu.css";
interface Props {
  role?: string;
}
export const SideMenu: React.FC<Props> = ({ role }) => {
  // const { user } = useAppSelector((s) => s.authReducer);
  return (
    <>
      <div className="side-menu">
        <ul>
          <li>
            <NavLink to={"/"}>
              <LockFilled />
              Vault
            </NavLink>
          </li>
          <li>
            <NavLink to={"/secure-share"}>
              <LinkOutlined />
              Secure Share
            </NavLink>
          </li>
          {role && role === "ADMIN" ? (
            <li>
              <NavLink to={"/teams"}>
                <UserOutlined />
                Teams
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to={"/members"}>
                <TeamOutlined />
                Team members
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
