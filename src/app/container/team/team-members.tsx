import { TeamDetails } from "../../components/teams/details";
import { UserListTable } from "../../components/users/list-table";
import { useAppSelector } from "../../slice";

export const TeamMemberContainer = () => {
  const { user } = useAppSelector((s) => s.authReducer);

  return (
    <>
      <div className="body-container">
        <div className="body ">
          {user?.team && (
            <>
              <TeamDetails id={user.team} />
              <UserListTable id={user.team} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
