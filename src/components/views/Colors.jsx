import { useState } from "react";
import { useEffect } from "react";
import { Button, Row, Spinner } from "react-bootstrap";
import useApi from "../../hooks/use-api";
import AlertMsg from "../AlertMsg";
import CardLayout from "../layout/CardLayout";

const Colors = () => {
	const {makeRequest: getColors, isLoading, alert} = useApi();
	const [colors, setColors] = useState([]);

	useEffect(() => {
		getColors({url: 'colors'}, (response) => {
			console.log(response);
			setColors(response.data);
		});
	}, [getColors]);
	return (
		<CardLayout title="Colors">
			{isLoading && <Row className="justify-content-md-center">
				<Spinner animation="border" variant="dark" />
			</Row>}
			{colors.map((color) => <Button className="me-2 mb-2" style={{backgroundColor: `${color.code}`, color: `${color.code}`, border: 0}}>color</Button>)}
			<AlertMsg {...alert} />
		</CardLayout>
	);
}

export default Colors;