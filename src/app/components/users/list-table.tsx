import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import { GetUserListAction } from "../../slice/user";

export interface Props {
  id: string;
}
export const UserListTable: React.FC<Props> = ({ id }) => {
  const [page, setPage] = useState(1);
  const { loader, userList } = useAppSelector((u) => u.userReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetUserListAction({ page, team: id }));
  }, [dispatch, page]);
  return (
    <>
      <Table
        columns={[
          { key: "firstName", title: "First name", dataIndex: "firstName" },
          { key: "lastName", title: "Last name", dataIndex: "lastName" },
          { key: "email", title: "Email", dataIndex: "email" },
          { key: "createdAt", dataIndex: "createdAt", title: "Created on" },
        ]}
        dataSource={userList?.records || []}
        loading={loader}
      />
    </>
  );
};
