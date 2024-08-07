import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { status: number };

  let errorMessage = null;
  switch (error.status) {
    default:
      errorMessage = <div>NOT FOUND</div>;
      break;
  }

  return <>{errorMessage}</>;
}
