import { useFormik } from "formik";
import * as yup from "yup";
import { useSubmit, useNavigation, Form } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const testingData = Object.fromEntries(formData);
  console.log(testingData);
  return null;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email is Required"),
  password: yup
    .string()
    .required("Password Is Required")
    .min(6, "Password Must Be 6 Character Long or More"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password Must Match"),
});

const Testing = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const submit = useSubmit();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      submit(values, { method: "post" });
    },
  });

  return (
    <>
      <h1>Hello, Here is The Form</h1>
      <Form method="post" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            id="repeatPassword"
            type="text"
            name="repeatPassword"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
            <div>{formik.errors.repeatPassword}</div>
          ) : null}
        </div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    </>
  );
};

export default Testing;
