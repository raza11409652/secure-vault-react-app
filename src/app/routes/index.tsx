import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppDashboard } from "../container/dashboard";
import { LoginContainer } from "../container/login";
import { RegisterContainer } from "../container/register";
import { SecureShareContainer } from "../container/secure-share";
import { SecureShareView } from "../container/share-vault-voew";
import { TeamListContainer } from "../container/team/team-list";
import { TeamMemberContainer } from "../container/team/team-members";
import { SecureVaultContainer } from "../container/vault";
import { useAppSelector } from "../slice";

export const AppRoutes = () => {
  const { authenticated } = useAppSelector((s) => s.authReducer);
  useEffect(() => {
    const handleLogout = () => {
      console.log("Logout session expired ");
    };
    window.addEventListener("user-logout-action", handleLogout);
    return () => {
      window.removeEventListener("user-logout-action", handleLogout);
    };
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          {authenticated ? (
            <Route path="/">
              <Route
                index
                element={<AppDashboard children={<SecureVaultContainer />} />}
              />
              <Route
                path="secure-share"
                element={<AppDashboard children={<SecureShareContainer />} />}
              />
              <Route
                path="teams"
                element={<AppDashboard children={<TeamListContainer />} />}
              />
              <Route
                path="members"
                element={<AppDashboard children={<TeamMemberContainer />} />}
              />
            </Route>
          ) : (
            <Route path="/">
              <Route index element={<LoginContainer />} />
              <Route path="register" element={<RegisterContainer />} />
            </Route>
          )}
          <Route
            path="/view-content/:id"
            element={<AppDashboard children={<SecureShareView />} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
