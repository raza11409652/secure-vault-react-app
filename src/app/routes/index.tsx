import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LoginContainer } from "../container/login"
import { RegisterContainer } from "../container/register"
import { useAppSelector } from "../slice"

export const AppRoutes = ()=>{
  const {authenticated} = useAppSelector(s=>s.authReducer)
    return<>
       <BrowserRouter>
      <Routes>
        {authenticated ? (
          <></>
        ) : (
          <Route path="/">
            <Route index element={<LoginContainer />} />
            <Route path="register" element={<RegisterContainer />} />
          </Route>
        )}
        {/* <Route path="/views/qr-form/:id" element={<QrFormView />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </>
}