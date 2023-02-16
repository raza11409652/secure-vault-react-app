import { Button, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState } from "react";
import { createVaultEntryApi } from "../../apis/vault/vault";
import { useAppSelector } from "../../slice";
import { VaultCreateBody } from "../../types/vault";
import handleAxiosError from "../../utils/error/axios";
interface Props {
  close: () => void;
}
export const SecureVaultForm: React.FC<Props> = ({ close }) => {
  const { user } = useAppSelector((s) => s.authReducer);
  const types = ["PASSWORD", "NOTES"];
  const [loader, setLoader] = useState(false);
  const [selectedType, setSelectedType] = useState("PASSWORD");
  const [form] = Form.useForm();
  const body: VaultCreateBody = {
    name: "",
    type: "PASSWORD",
    url: "",
    username: "",
    password: "",
    notes: "",
    team: user?.team || "",
  };
  const submit = async (b: VaultCreateBody) => {
    // console.log(b);
    try {
      b = { ...b, team: user?.team || "" };
      // console.log({ user: user?.team });
      setLoader(true);
      const result = await createVaultEntryApi(b);
      console.log({ result });
      message.success("Created successfully");
      form.resetFields();
      close();
    } catch (e: any) {
      handleAxiosError(e);
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={body}
        onFinish={submit}
      >
        <Form.Item
          label="Name"
          name={"name"}
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Type" name={"type"}>
          <Select
            onChange={(e) => setSelectedType(e)}
            options={types.map((a) => {
              return { value: a, label: a };
            })}
          />
        </Form.Item>
        {selectedType === "PASSWORD" ? (
          <>
            <Form.Item
              name={"url"}
              label="Url"
              rules={[
                { required: true, message: "Url is required" },
                {
                  type: "url",
                  message: "URL should be  a valid url",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Username"
                  name={"username"}
                  rules={[{ required: true, message: "Username is required" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name={"password"}
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input type="password" />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}

        <Form.Item label="Notes" name={"notes"}>
          <Input.TextArea
            maxLength={512}
            showCount
            name="notes"
          ></Input.TextArea>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loader}
            htmlType="submit"
            type="primary"
            size="large"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
