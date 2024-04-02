import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../redux/contacts/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contacts/operations";
import ContactList from "../components/ContactList/ContactList";
import ContactEditor from "../components/ContactEditor/ContactEditor";
import PageTitle from "../components/PageTitle/PageTitle";

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <PageTitle>Your contacts</PageTitle>
      <ContactEditor />
      <div>{isLoading && "Request in progress..."}</div>
      <ContactList />
    </>
  );
}
