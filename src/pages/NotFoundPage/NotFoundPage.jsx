import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const NotFoundPage = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (timer === 5) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Sorry, this page doesn&apos;t exist (:404) </h1>
      <h2>You will be redirected to Home page in {5 - timer} seconds.</h2>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default NotFoundPage;
