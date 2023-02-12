import { Form, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
// import Button from "antd/es/button";

export const RegisterContainer = () => {
  return (
    <>
      <div className="body-wrapper">
        <div className="auth-form">
          <Form layout="vertical">
            <Form.Item label="Email" name={"email"}>
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Password" name={"password"}>
              <Input type="password" />
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
