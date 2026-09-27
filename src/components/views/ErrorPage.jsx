import { useRouteError} from "react-router-dom"
import Layout from "../layout/Layout";

export default function ErrorPage () {
  const error = useRouteError();

  let errorTitle = "An Error Occurred";
  let errorDesc = "Something went wrong!!";
  
  if(error.status === 404){
    errorTitle = "Page Not Found";
    errorDesc = "Sorry, the page or resource you are looking for could not be found.";
  }

  if(error.status === 500){
    errorDesc = error.data.message;
  }

  return <Layout>
    <div className="my-2 mx-auto d-flex flex-column align-items-center justify-content-center" style={{ height: '60vh'}}>
      <h1>{errorTitle}</h1>
      <p>{errorDesc}</p>
    </div>
  </Layout> 
}