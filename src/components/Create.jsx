/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { APIURL } from "./redux/apiSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function Create({ getData }) {
  const API_URL = useSelector(APIURL);

  const CreateSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    content: Yup.string().min(5, "Too Short!").required("Required"),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      const newCard = {
        title: values.title,
        content: values.content,
      };

      const res = await axios.post(API_URL, newCard);
      if (res.status === 201) {
        toast.success("New CARD added");
        getData();
        resetForm();
      }
    } catch (error) {
      toast.error("Create CARD error");
    }
  };

  const handleKeyPress = (event, handleSubmit) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit();
    }
  };

  return (
    <>
      <div className='form-container'>
        <h3>Add a Note</h3>
        <Formik
          initialValues={{ title: "", content: "" }}
          validationSchema={CreateSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, errors, touched }) => (
            <Form>
              <div className='mb-3'>
                <Field
                  type='text'
                  className={`form-control ${
                    errors.title && touched.title ? "is-invalid" : ""
                  }`}
                  id='exampleFormControlInput1'
                  placeholder='Title'
                  required
                  name='title'
                />
                <ErrorMessage
                  name='title'
                  component='div'
                  className='text-danger error-message'
                />
              </div>
              <div className='mb-3'>
                <Field
                  as='textarea'
                  className={`form-control custom-textarea ${
                    errors.content && touched.content ? "is-invalid" : ""
                  }`}
                  placeholder=' Take a note...'
                  id='exampleFormControlTextarea1'
                  rows='3'
                  required
                  name='content'
                  onKeyDown={(event) => handleKeyPress(event, handleSubmit)}
                />
                <ErrorMessage
                  name='content'
                  component='div'
                  className='text-danger error-message'
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Create;
