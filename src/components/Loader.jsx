import { Row, Spinner } from "react-bootstrap";

const Loader = (props) => {
	return (<Row className="justify-content-center">
		<Spinner animation="border" variant={`${props.type || 'dark'}`} />
	</Row>);
}

export default Loader;