import { Link, useLoaderData } from "react-router-dom";

import CardLayout from "../layout/CardLayout";

export default function Accounts() {
  const accountsList = useLoaderData();

  return <CardLayout title="Accounts">
    <h5>Accounts List</h5>
    <ul style={{listStyle: "none", paddingLeft: 0}}>
      {accountsList.map(acct => <li key={acct.id}><Link to={`/accounts/${acct.id}`} style={{textDecoration: "none"}}>{acct.name}</Link></li>)}
    </ul>
  </CardLayout>
}
