import { useLoaderData, useParams } from "react-router-dom";
import CardLayout from "../layout/CardLayout";
import { Link } from "react-router-dom";

export default function AccountDetails() {
  const routeParams = useParams();
  const data = useLoaderData();
// console.log(loaderData);
  const responseData = data.detail;

return <CardLayout title={`Account Details (${routeParams.accId})`}>
    <p>{responseData}</p>
    <Link to=".." relative="path">Back</Link>
  </CardLayout>
}