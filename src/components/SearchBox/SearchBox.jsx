import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { selectFilter } from "../../redux/filters/selectors";
import { filterContacts } from "../../redux/filters/slice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const onChangefilter = (event) => {
    const action = filterContacts(event.target.value);
    dispatch(action);
  };

  return (
    <div className={css.container}>
      <label className={css.label}>
        Find contacts by name
        <input
          type="text"
          value={filter}
          onChange={onChangefilter}
          className={css.field}
        />
      </label>
    </div>
  );
};

export default SearchBox;
