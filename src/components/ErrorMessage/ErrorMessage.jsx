import { useSelector } from "react-redux";
import { selectError } from "../../redux/contacts/selectors";

const ErrorMessage = () => {
  const error = useSelector(selectError);
  return <div>Sorry, something went wrong. Error: {error}</div>;
};

export default ErrorMessage;
