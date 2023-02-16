import { useParams } from "react-router-dom";

export const SecureShareView = () => {
  const { id } = useParams();
  console.log(id);
  return <></>;
};
