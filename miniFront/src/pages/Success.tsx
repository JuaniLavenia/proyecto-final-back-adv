import { useEffect } from "react";
import { Link } from "react-router-dom";

function Success() {
  useEffect(() => {
    const currentUrl = window.location.href;
    const searchParams = new URLSearchParams(currentUrl);
    const queryParams: Record<string, string> = {};
    searchParams.forEach((value: string, key: string) => {
      queryParams[key] = value;
    });
    console.log(queryParams)
  }, []);

  return (
    <div>
      <Link to={'/'}>Vamos a comprar</Link>
      <h2>Success</h2>
    </div>
  )
}

export default Success