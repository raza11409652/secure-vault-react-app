import { GithubFilled } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
import { AppLogo } from "../../components/logo";
import { useAppDispatch, useAppSelector } from "../../slice";
import { AuthAction } from "../../slice/auth";
import { AuthLogin } from "../../types/auth";
// import Button from "antd/es/button";

export const LoginContainer = () => {
  const { loader } = useAppSelector((s) => s.authReducer);
  const body: AuthLogin = { email: "", password: "" };
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const submit = (v: AuthLogin) => {
    dispatch(AuthAction(v));
  };
  return (
    <>
      <div className="body-wrapper">
        <div className="auth-form">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AppLogo />
          </div>
          <Form
            layout="vertical"
            form={form}
            initialValues={body}
            onFinish={submit}
          >
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Should be a valid email" },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loader}
                htmlType="submit"
                type="primary"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <NavLink to={"/register"}>Register now</NavLink>
            </Form.Item>
          </Form>
        </div>
        <div className="pad-1">
          <NavLink to={"https://github.com/raza11409652/secure-vault-react-app"} target="_blank">
            <GithubFilled />
          </NavLink>
        </div>
      </div>
    </>
  );
};
