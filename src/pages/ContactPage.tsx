import { FormEvent, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

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

export function contactAction() {
  return redirect(`/thank-you/bob`);
}

function ContactPage() {
  const [contact, setContact] = useState<Contact>(initialState);
  const nagivate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    nagivate(`/thank-you/${data.get("name")}`);
  };

  return (
    <>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Your name</label>
          <input
            name="name"
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            value={contact.name}
          />
        </div>
        <div>
          <label>Your email</label>
          <input onChange={(e) => e.target.value} name="email" />
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
      </form>
    </>
  );
}

export default ContactPage;
