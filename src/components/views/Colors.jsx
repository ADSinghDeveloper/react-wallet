import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import useApi from "../../hooks/use-api";
import AlertMsg from "../AlertMsg";
import CardLayout from "../layout/CardLayout";
import Loader from "../Loader";

const Colors = () => {
  const { makeRequest: getColors, isLoading, alert } = useApi();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors([]);
    getColors({ url: "colors" }, (response) => {
      setColors(response.data);
    });
  }, [getColors]);
  return (
    <CardLayout title="Colors" className="text-center">
      {isLoading && <Loader />}
      <Row lg={12}>
        {colors.map((color, index) => (
          <Col key={index} lg={1} md={2} sm={2} xs={3}>
            <div
              className="shadow rounded mb-3 py-3"
              style={{
                backgroundColor: `${color.code}`,
                color: `${color.code}`,
              }}
            >color</div>
          </Col>
        ))}
      </Row>
      <AlertMsg {...alert} />
    </CardLayout>
  );
};

export default Colors;