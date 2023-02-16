import { Button, Modal, Table, Typography } from "antd";
import { BookFilled, CopyFilled, FileAddFilled } from "@ant-design/icons";
import React from "react";
import { SecureShareForm } from "../../components/forms/secure-share-form";
import { useAppDispatch, useAppSelector } from "../../slice";
import { clearLink, GetShareVaultListAction } from "../../slice/secure-share";
import { copyTOClipboard } from "../../utils/copy";
// import { useAppSelector } from "../../slice";
export const SecureShareContainer = () => {
  const { loader, shareList } = useAppSelector((s) => s.secureShareReducer);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetShareVaultListAction({ page }));
  }, [page]);
  const onClose = () => {
    dispatch(clearLink());
    setOpen(false);
    setPage(1);
    dispatch(GetShareVaultListAction({ page: 1 }));
  };
  return (
    <>
      <div className="body-container">
        <div className="header">
          <h5></h5>
          <Button icon={<FileAddFilled />} onClick={() => setOpen(true)}>
            Create new
          </Button>
        </div>
        <div className="body">
          <Table
            rowKey={"_id"}
            columns={[
              { title: "Key", dataIndex: "findingKey", key: "findingKey" },
              {
                title: "Allowed count",
                dataIndex: "maxViewAllowed",
                key: "maxViewAllowed",
              },
              { title: "View count", key: "viewCount", dataIndex: "viewCount" },
              {
                title: "Timestamp",
                key: "createdAt",
                dataIndex: "createdAt",
              },
              {
                title: "URL",
                key: "url",
                dataIndex: "url",
                render: (u: string) => (
                  <Button
                    onClick={() => copyTOClipboard(u)}
                    icon={<CopyFilled />}
                  >
                    Copy
                  </Button>
                ),
              },
              {
                title: "Action",
                key: "_id",
                dataIndex: "_id",
                render: (id: string) => (
                  <Button type="text" icon={<BookFilled />}>
                    History
                  </Button>
                ),
              },
            ]}
            dataSource={shareList?.records || []}
            loading={loader}
            pagination={false}
          />
        </div>
        <div className="footer"></div>
      </div>
      <Modal
        width={"50vw"}
        children={<SecureShareForm />}
        open={open}
        title="Secure share"
        onCancel={onClose}
        destroyOnClose
        footer={null}
      ></Modal>
    </>
  );
};
