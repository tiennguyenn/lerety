import { FieldError, useForm } from "react-hook-form";
import {
  ActionFunctionArgs,
  redirect,
  useNavigate,
} from "react-router-dom";
import ValidationError from "./ValidationError";

type Contact = {
  name: string;
  email: string;
  reason: string;
  notes: string;
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Contact>({ mode: "onBlur", reValidateMode: "onBlur" });

  const onValid = (contact: Contact) => {
    nagivate(`/thank-you/${contact.name}`);
  };

  const getError = (fieldError: FieldError | undefined) => {
    if (!fieldError) {
      return;
    }

    return {
      border: "3px solid red",
      paddingTop: "5px",
    };
  };

  return (
    <>
      <h2>Contact</h2>
      <form noValidate onSubmit={handleSubmit(onValid)} method="post">
        <div>
          <label>Your name</label>
          <input
            {...register("name", { required: "Name is required" })}
            style={getError(errors.name)}
          />
          <ValidationError fieldError={errors.name} />
        </div>
        <div>
          <label>Your email</label>
          <input
            {...register("email", {
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is invalid",
              },
            })}
          />
          <ValidationError fieldError={errors.email} />
        </div>
        <div>
          <label>Reason to contact</label>
          <select {...register("reason")}>
            <option value=""></option>
            <option>Support</option>
            <option>Feedback</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label>Notes</label>
          <textarea {...register("notes")}></textarea>
        </div>
        <div>
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default ContactPage;
