export default function loader() {
  // Or write any async API code.
  //throw new Response(JSON.stringify({message: "Server response error."}), {status: 500});
  
  return [
    {id: "slr", name: "Salary"},
    {id: "oth", name: "Other"},
    {id: "ads", name: "AD Singh"},
    {id: "svg", name: "Saving"},
  ]
}