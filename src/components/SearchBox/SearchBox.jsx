import { useId } from "react";
import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { changeNameFilter } from "../../redux/filters/slice";

export default function SearchBox() {
  const elementId = useId();
  const value = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handlerChange = (e) => {
    dispatch(changeNameFilter(e.target.value));
  };

  return (
    <div className={css.div}>
      <label className={css.label} htmlFor={elementId}>
        Find contacts by name
      </label>
      <input
        type="text"
        value={value}
        onChange={handlerChange}
        id={elementId}
        placeholder="Search"
      />
    </div>
  );
}
