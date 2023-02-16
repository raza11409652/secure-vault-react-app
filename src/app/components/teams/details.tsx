import { Descriptions, Spin } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../slice";
import { GetTeamDetailsAction } from "../../slice/teams";

interface Props {
  id: string;
}
export const TeamDetails: React.FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { loader, teamDetails } = useAppSelector((s) => s.teamReducer);
  useEffect(() => {
    dispatch(GetTeamDetailsAction(id));
  }, [id, dispatch]);
  return (
    <>
      {loader ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin />
        </div>
      ) : (
        <div className="pad-1">
          <Descriptions>
            <Descriptions.Item
              label="Team name"
              children={teamDetails?.team.name}
            ></Descriptions.Item>
            <Descriptions.Item
              label="Team manager"
              children={teamDetails?.admin?.firstName}
            ></Descriptions.Item>
            <Descriptions.Item
              label="Team manager email"
              children={teamDetails?.admin?.email}
            ></Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </>
  );
};
