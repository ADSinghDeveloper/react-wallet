import { Col, Row } from "react-bootstrap";
import CardLayout from "../layout/CardLayout";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import fetchApi, { hasAuthToken } from "../../utilities/fetch-api";

const Dashboard = () => {
  const {data, isLoading} = useQuery({
    queryKey: ["colors"],
    queryFn: ({ signal }) => fetchApi({url: "colors", signal}),
    staleTime: (9 * 60 * 1000), // how long the cached data would be stored or retained.
    // gcTime: 59000, // garbage collection time
    enabled: hasAuthToken(),
  });

  return (
    <CardLayout title="Dashboard">
      <div>
        <Row lg={12}>
          {isLoading? <Loader /> : data?.map((color) => <Col key={color.code} lg={1} md={2} sm={2} xs={3}>
          <div className="shadow rounded mb-4 py-4" style={{backgroundColor: `${color.code}`, color: `${color.code}`}}>
            color
          </div>
        </Col>)}
        </Row>
      </div>
    </CardLayout>
  );
};

export default Dashboard;
