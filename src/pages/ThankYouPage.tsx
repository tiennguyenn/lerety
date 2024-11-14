import { useParams } from "react-router-dom";

function ThankYouPage() {
  const { name } = useParams();
  return (
    <>
      <h2>Thank you to contact, {name}</h2>
    </>
  );
}

export default ThankYouPage;
