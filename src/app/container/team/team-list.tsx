import { CopyFilled, LinkOutlined, UserAddOutlined } from "@ant-design/icons";
import { Alert, Button, notification, Table, Tag } from "antd";
import React from "react";
import { useState } from "react";
import { getTeamInvite } from "../../apis/team";
import { useAppDispatch, useAppSelector } from "../../slice";
import { GetTeamListAction } from "../../slice/teams";
import { copyTOClipboard } from "../../utils/copy";
import handleAxiosError from "../../utils/error/axios";

export const TeamListContainer = () => {
  const [page, setPage] = useState(1);
  const { loader, listTeam } = useAppSelector((s) => s.teamReducer);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(GetTeamListAction(page));
  }, [dispatch, page]);
  const inviteLink = async (id: string) => {
    try {
      const data = await getTeamInvite(id);
      notification.success({
        message: "Link has been generated",
        description: (
          <Alert
            banner
            showIcon={false}
            type="info"
            message={data}
            action={
              <Button
                icon={<CopyFilled />}
                onClick={() => copyTOClipboard(data)}
              />
            }
          />
        ),
      });
    } catch (e: any) {
      handleAxiosError(e);
    }
  };
  return (
    <>
      <div className="body-container">
        <div className="header">
          <h5></h5>
          <Button icon={<UserAddOutlined />}>Add new</Button>
        </div>
        <div className="body">
          <Table
            rowKey={"_id"}
            columns={[
              { key: "name", dataIndex: "name", title: "Name" },
              {
                key: "active",
                dataIndex: "active",
                title: "Status",
                render: (v: boolean) => (
                  <Tag color={v ? "green" : "red"}>
                    {v ? "Active" : "Inactive"}
                  </Tag>
                ),
              },
              {
                key: "_id",
                dataIndex: "_id",
                title: "Users",
                render: (id: string) => (
                  <Button type="text">View members</Button>
                ),
              },
              {
                key: "_id",
                dataIndex: "_id",
                title: "Password",
                render: (id: string) => (
                  <Button
                    type="text"
                    icon={<LinkOutlined />}
                    onClick={() => inviteLink(id)}
                  >
                    Get invite link
                  </Button>
                ),
              },
              {
                key: "_id",
                dataIndex: "_id",
                title: "Password",
                render: (id: string) => <Button>Reset master password</Button>,
              },
            ]}
            pagination={false}
            dataSource={listTeam?.records || []}
            loading={loader}
          ></Table>
        </div>
      </div>
    </>
  );
};
