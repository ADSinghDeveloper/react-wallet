// "request" and "params" provided by react-router-dom to the loader function.
export default async function loader({request, params}){
  // Or write any async API code.

  return {detail: "Dummy detail of \"" + params.accId + "\" from loader."};
}