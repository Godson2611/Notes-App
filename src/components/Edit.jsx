/** @format */

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { APIURL } from "./redux/apiSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const API_URL = useSelector(APIURL);
  const [initialValues, setInitialValues] = useState({
    title: "",
    content: "",
  });

  const EditSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    content: Yup.string().min(5, "Too Short!").required("Required"),
  });

  const getData = async (index) => {
    try {
      const res = await axios.get(`${API_URL}`);
      const data = res.data[index];
      if (res.status === 200) {
        setInitialValues(data);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Data Fetch Error Occurred");
    }
  };

  useEffect(() => {
    if (params.id === undefined || isNaN(Number(params.id))) {
      navigate("/dashboard");
    } else {
      getData(Number(params.id));
    }
  }, [params.id, navigate]);

  const handleFormSubmit = async (values, id) => {
    // const newCard = {
    //   title: values.title,
    //   content: values.content,
    // };

    try {
      const res = await axios.put(`${API_URL}/${id}`, values);
      if (res.status === 200) {
        toast.success("Changes saved");
        navigate("/dashboard");
      } else {
        toast.error("Failed to save changes");
      }
    } catch (error) {
      console.log("error:", error);
      toast.error("Error saving changes: " + error);
    }
  };

  return (
    <div className='col-md-9 dashboard'>
      <div className='form-container condain'>
        <h3>Edit Notes</h3>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={EditSchema}
          onSubmit={(valuse) => handleFormSubmit(valuse)}
        >
          {({ handleSubmit, errors, touched, values, handleChange }) => (
            <Form>
              <div className='mb-3'>
                <label htmlFor='title' className='form-label'>
                  Title
                </label>
                <Field
                  type='text'
                  className={`form-control ${
                    errors.title && touched.title ? "is-invalid" : ""
                  }`}
                  id='title'
                  placeholder='Title'
                  required
                  name='title'
                  value={values.title}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name='title'
                  className='text-danger error-message'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='content' className='form-label'>
                  Content
                </label>
                <Field
                  as='textarea'
                  className={`form-control custom-textarea ${
                    errors.content && touched.content ? "is-invalid" : ""
                  }`}
                  placeholder='Take a note...'
                  id='content'
                  rows='3'
                  required
                  name='content'
                  value={values.content}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name='content'
                  className='text-danger error-message'
                />
              </div>
              <button
                type='submit'
                className='btn btn-primary'
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Edit;
