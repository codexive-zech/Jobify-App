import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ formData }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className={`btn btn-block ${formData ? "form-btn" : null} `}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting" : "Add Job"}
    </button>
  );
};

export default SubmitBtn;
