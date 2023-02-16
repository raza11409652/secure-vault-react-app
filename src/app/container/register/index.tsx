import { Form, Input, Button, message } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppLogo } from "../../components/logo";
import { AuthRegister } from "../../types/auth";
// import Button from "antd/es/button";
import { registerApi } from "../../apis/auth/register-api";
export const RegisterContainer = () => {
  const [loader, setLoader] = useState(false);
  const [form] = Form.useForm();
  const b: AuthRegister = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const submit = async (v: AuthRegister) => {
    // console.log({ v });
    try {
      setLoader(true);
      const response = await registerApi(v);
      // return response;
      console.log({ response });
      message.success("Account has been created");
      form.resetFields();
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <div className="body-wrapper">
        <div className="auth-form">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AppLogo />
          </div>
          <Form layout="vertical" initialValues={b} onFinish={submit}>
            <Form.Item
              label="First name"
              name={"firstName"}
              rules={[{ required: true, message: "First name is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last name"
              name={"lastName"}
              rules={[{ required: true, message: "Last name is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                { required: true, message: "E-mail  is required" },
                { type: "email", message: "Email is invalid" },
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
                Register
              </Button>
            </Form.Item>
            <Form.Item>
              <NavLink to={"/"}>Back to login</NavLink>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
