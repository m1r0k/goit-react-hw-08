import css from "./App.module.css";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import Layout from "../Layout/Layout";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contactsOps";
import { selectError, selectLoading } from "../../redux/contactsSlice";
import { Toaster } from "react-hot-toast";

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Layout>
      <h1 className={css.header}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {error && <Error>Something went wrong! Please reload.</Error>}
      {loading && <Loader />}
      <ContactList />
      <Toaster />
    </Layout>
  );
}
