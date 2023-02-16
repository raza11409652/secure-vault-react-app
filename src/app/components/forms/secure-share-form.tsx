import { CopyFilled, ShareAltOutlined } from "@ant-design/icons";
import { Form, Input, Button, Typography, Alert } from "antd";
import { useAppDispatch, useAppSelector } from "../../slice";
import { CreateNewShareAction } from "../../slice/secure-share";
import { ShareBody } from "../../types/vault";
import { copyTOClipboard } from "../../utils/copy";
const { TextArea } = Input;
export const SecureShareForm = () => {
  const dispatch = useAppDispatch();
  const { loader, link } = useAppSelector((s) => s.secureShareReducer);
  const b: ShareBody = { content: "" };
  const submit = (v: ShareBody) => {
    dispatch(CreateNewShareAction(v));
  };
  return (
    <>
      <Form layout="vertical" initialValues={b} onFinish={submit}>
        <Form.Item
          name={"content"}
          label="Content"
          rules={[
            {
              required: true,
              message: "Please enter content",
            },
          ]}
        >
          <TextArea showCount rows={6} maxLength={1024} />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loader}
            htmlType="submit"
            type="primary"
            size="large"
            icon={<ShareAltOutlined />}
          >
            Get link
          </Button>
        </Form.Item>
      </Form>
      {!loader && link && (
        <>
          <Alert
            action={
              <Button
                icon={<CopyFilled />}
                onClick={() => {
                  copyTOClipboard(link)
                }}
              ></Button>
            }
            type="info"
            showIcon={false}
            banner
            message={<p style={{ margin: 0 }}>{link}</p>}
          ></Alert>
        </>
      )}
    </>
  );
};
