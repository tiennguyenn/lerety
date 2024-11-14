import { FieldError } from "react-hook-form";

type Props = {
  fieldError: FieldError | undefined;
};
function ValidationError({ fieldError }: Props) {
  if (!fieldError) {
    return null;
  }

  return <span style={{ color: "red" }}>{fieldError.message}</span>;
}

export default ValidationError;
