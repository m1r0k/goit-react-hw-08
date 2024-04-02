import css from "./ContactForm.module.css";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/selectors";
import { Toaster } from "react-hot-toast";
import ErrorToast from "../Toast/ErrorToast";
import SuccessToast from "../Toast/SuccessToast";
import { addContact } from "../../redux/contacts/operations";

const phoneRegExp = /^(\d{3}-\d{2}-\d{2})$/;
const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(30, "Too long!")
    .required("This is required you dummy!"),
  number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("This is required you dummy!"),
});

export default function ContactForm() {
  const elementId = useId();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handlerSubmit = (values, action) => {
    if (
      contacts.find(
        (contact) =>
          contact.name.toLowerCase() === values.name.toLowerCase() ||
          contact.number === values.number
      )
    ) {
      action.resetForm();
      return ErrorToast("Error! Try again");
    }
    dispatch(addContact(values))
      .unwrap()
      .then(() => SuccessToast("Contact added successfully!"));
    action.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={contactSchema}
      onSubmit={handlerSubmit}
    >
      <Form className={css.form}>
        <div className={css.div}>
          <label htmlFor={elementId + "-name"}>Name</label>
          <Field
            type="text"
            className={css.input}
            name="name"
            id={elementId + "-name"}
            placeholder="Name"
          />
          <ErrorMessage
            className={css.error}
            name="name"
            component="span"
          ></ErrorMessage>
        </div>
        <div className={css.div}>
          <label htmlFor={elementId + "-number"}>Number</label>
          <Field
            className={css.input}
            type="tel"
            name="number"
            id={elementId + "-number"}
            placeholder="xxx-xx-xx"
          />
          <ErrorMessage
            className={css.error}
            name="number"
            component="span"
          ></ErrorMessage>
        </div>
        <button className={css.btn} type="submit">
          Add contact
        </button>
        <Toaster />
      </Form>
    </Formik>
  );
}
