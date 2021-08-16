import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'

const FormApp = () => {
    const initialValues = {
        email: '',
        password:'',
        confirm_password:'',
    }
    
    const validationSchema = Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
      password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Password and confirm password does not match')
        .required('Required'),
    })

    const onSubmit = async(values) => {
      await new Promise((r) => setTimeout(r, 500));
      alert(JSON.stringify(values, null, 2));
    }

    return (
      <div>
          <h1>Form</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >

          { formik => (
            <Form>
              <div>
                <label htmlFor="email">Email</label><br />
                <Field
                  id="email"
                  name="email"
                  type="email"
                />
                {/* {formik.errors.email && formik.touched.email ? (
                  <div>{formik.errors.email}</div>
                ): null} */}
                <div>
                  <ErrorMessage name="email" />
                </div>
              </div>

              <div>
                <label htmlFor="email">Password</label><br />
                <Field
                  id="password"
                  name="password"
                  type="password"
                />
                <div>
                  <ErrorMessage name="password" />
                </div>
              </div>

              <div>
                <label htmlFor="email">Confirm Password</label><br />
                <Field
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                />
                <div>
                  <ErrorMessage name="confirm_password" />
                </div>
              </div>

              <button type='submit' disabled={!formik.isValid}>
                Submit
              </button>
            </Form>
            )}
          </Formik>
        </div>
    );
  }
  
  export default FormApp;
  