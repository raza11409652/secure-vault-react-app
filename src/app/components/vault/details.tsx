import { Alert, Button, Descriptions, Form, Input, Spin } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import { GetVaultDetailsAction } from "../../slice/vault";
import { VaultViewDetailsBody } from "../../types/vault";

interface Props {
  id: string;
}
export const VaultDetails: React.FC<Props> = ({ id }) => {
  const { user } = useAppSelector((a) => a.authReducer);
  const { loader, details } = useAppSelector((s) => s.vaultReducer);
  const dispatch = useAppDispatch();
  const b: VaultViewDetailsBody = {
    password: "",
    id,
  };
  const submit = (b: VaultViewDetailsBody) => {
    // console.log(b);
    b = { ...b, id };
    dispatch(GetVaultDetailsAction(b));
  };
  React.useEffect(() => {
    if (user?.role === "ADMIN") {
      submit(b);
    }
  }, [user?.role, dispatch]);
  return (
    <>
      {!loader && details ? (
        <>
          <Descriptions>
            <Descriptions.Item
              label="Name"
              children={details.name}
            ></Descriptions.Item>
            <Descriptions.Item
              label="Type"
              children={details.type}
            ></Descriptions.Item>
            {details.type === "PASSWORD" && (
              <>
                <Descriptions.Item 
                  label="Url"
                  children={details?.url || ""}
                ></Descriptions.Item>
                <Descriptions.Item
                  label="Username"
                  children={details.username}
                ></Descriptions.Item>
                <Descriptions.Item
                  label="Password"
                  children={details.username}
                ></Descriptions.Item>
              </>
            )}
            <Descriptions.Item
              label="Notes"
              children={details?.notes || ""}
            ></Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <>
          {user?.role !== "ADMIN" ? (
            <>
              <Alert
                type="info"
                banner
                message="To view details please enter your team master password"
              />
              <Form layout="vertical" initialValues={b} onFinish={submit}>
                <Form.Item
                  label="Password"
                  name={"password"}
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input type="password"></Input>
                </Form.Item>
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    loading={loader}
                  >
                    Verify
                  </Button>
                </Form.Item>
              </Form>
            </>
          ) : (
            <Spin />
          )}
        </>
      )}
    </>
  );
};
