import { BookFilled, EyeFilled, FileAddFilled } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { SecureVaultForm } from "../../components/forms/secure-vault-form";
import { VaultDetails } from "../../components/vault/details";
import { useAppDispatch, useAppSelector } from "../../slice";
import {
  clearDetails,
  GetVaultListAction,
  setSelectedVaultId,
} from "../../slice/vault";

export const SecureVaultContainer = () => {
  const { loader, list, idSelected } = useAppSelector((s) => s.vaultReducer);
  const [openPassword, setOpenPassword] = useState(false);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetVaultListAction(page));
  }, [page, dispatch]);
  const handleViewDetails = (id: string) => {
    // console.log(id);
    dispatch(setSelectedVaultId(id));
    setOpenPassword(true);
  };

  const closePasswordView = () => {
    setOpenPassword(false);
    dispatch(setSelectedVaultId(""));
    dispatch(clearDetails());
  };
  const close = () => {
    setPage(1);
    dispatch(GetVaultListAction(1));
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
              { key: "name", title: "Name", dataIndex: "name" },
              { key: "type", title: "Type", dataIndex: "type" },
              {
                key: "_id",
                title: "Action",
                dataIndex: "_id",
                render: (id: string) => (
                  <>
                    <Button
                      icon={<BookFilled />}
                      type="text"
                      style={{ marginRight: "10px" }}
                    >
                      Logs
                    </Button>
                    <Button
                      onClick={() => handleViewDetails(id)}
                      icon={<EyeFilled />}
                      type="text"
                    >
                      View
                    </Button>
                  </>
                ),
              },
            ]}
            pagination={false}
            dataSource={list?.records || []}
            loading={loader}
          />
        </div>
      </div>

      <Modal
        children={<SecureVaultForm close={() => close()} />}
        onCancel={() => setOpen(false)}
        footer={null}
        width={"50vw"}
        open={open}
        title="Secure vault"
      />

      {idSelected && (
        <Modal
          destroyOnClose
          width={"50vw"}
          footer={null}
          onCancel={closePasswordView}
          children={<VaultDetails id={idSelected} />}
          open={openPassword}
          title="Details"
        />
      )}
    </>
  );
};
