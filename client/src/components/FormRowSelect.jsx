/* eslint-disable react/prop-types */
const FormRowSelect = ({ name, defaultValue, labelText, list }) => {
  return (
    <>
      <div className="form-row">
        <label htmlFor={name} className="form-label">
          {labelText || name}
        </label>
        <select
          name={name}
          id={name}
          className="form-select"
          defaultValue={defaultValue || ""}
          required
        >
          {/* Converting the value of the list-data from Object to Array */}
          {Object.values(list).map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
};

export default FormRowSelect;
