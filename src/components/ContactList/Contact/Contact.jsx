import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../../redux/contacts/operations";
import SuccessToast from "../../Toast/SuccessToast";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handlerDelete = () => {
    dispatch(deleteContact(contact.id))
      .unwrap()
      .then(() => SuccessToast("You delete one of the contacts!"));
  };

  return (
    <div className={css.card}>
      <div className={css.contactData}>
        <p>
          <FaUser /> {contact.name}
        </p>
        <p>
          <FaPhone /> {contact.number}
        </p>
      </div>
      <button onClick={handlerDelete} className={css.btn}>
        Delete
      </button>
    </div>
  );
}
