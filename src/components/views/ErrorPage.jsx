import { useRouteError} from "react-router-dom"

export default function ErrorPage () {
  const error = useRouteError();

  let errorTitle = "An Error Occurred";
  let errorDesc = "Something went wrong!!";
  
  if(error.status === 404){
    errorTitle = "Page Not Found";
    errorDesc = "Sorry, the page or resource you are looking for could not be found.";
  }else{
    errorTitle = error.status;
    errorDesc = error.message;
  }

  return <div className="my-2 mx-auto d-flex flex-column align-items-center justify-content-center" style={{ height: '80vh'}}>
      <h1>{errorTitle}</h1>
      <p>{errorDesc}</p>
    </div>
}
