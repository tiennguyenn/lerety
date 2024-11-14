import { FormEvent } from "react";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigate,
} from "react-router-dom";

type Contact = {
  name: string;
  email: string;
  reason: string;
  notes: string;
};

const initialState: Contact = {
  name: "",
  email: "",
  reason: "",
  notes: "",
};

export async function contactAction({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  const contact = {
    name: data.get("name"),
  } as Contact;

  return redirect(`/thank-you/${contact.name}`);
}

function ContactPage() {
  const nagivate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    nagivate(`/thank-you/${data.get("name")}`);
  };

  return (
    <>
      <h2>Contact</h2>
      <Form method="post">
        <div>
          <label>Your name</label>
          <input name="name" />
        </div>
        <div>
          <label>Your email</label>
          <input name="email" />
        </div>
        <div>
          <label>Reason to contact</label>
          <select name="reason">
            <option value=""></option>
            <option>Support</option>
            <option>Feedback</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label>Notes</label>
          <textarea name="notes"></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </>
  );
}

export default ContactPage;
