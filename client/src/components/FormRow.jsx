/* eslint-disable react/prop-types */
const FormRow = ({
  type,
  name,
  placeholder,
  labelText,
  defaultValue,
  onChange,
}) => {
  return (
    <>
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          className="form-input"
          defaultValue={defaultValue || ""}
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
};

export default FormRow;
