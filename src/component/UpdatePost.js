import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import MuiAlert from "@mui/material/Alert";

import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

import { CheckboxWithLabel } from "formik-material-ui";
import axios from "axios";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const UpdatePost = ({ id, title, content }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);

  };
  const formik = useFormik({
    initialValues: {
      title: title,
      content: content,
    },
    onSubmit: (values) => {
      axios
        .put(`https://635fe664ca0fe3c21aa783b3.mockapi.io/posts/${id}`, {
          title: values.title,
          content: values.content
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
        setOpen(true);


    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
        content: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        autoFocus
        margin="dense"
        name="title"
        label="Title"
        type="text"
        fullWidth
        variant="filled"
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      {formik.errors.title && formik.touched.title && (
        <p>{formik.errors.title}</p>
      )}
      <TextField
        autoFocus
        multiline
        rows={6}
        margin="dense"
        name="content"
        label="Content"
        type="text"
        fullWidth
        variant="filled"
        value={formik.values.content}
        onChange={formik.handleChange}
      />
      {formik.errors.content && formik.touched.content && (
        <p>{formik.errors.content}</p>
      )}
      <Grid item pt={5}>
        <Button fullWidth variant="contained" size="small" type="submit">
          Update
        </Button>

      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Update post successfully
            </Alert>
          </Snackbar>
    </form>
  );
};

export default UpdatePost;
