import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

import { CheckboxWithLabel } from "formik-material-ui";
import axios from "axios";

const CreatePost = ({ user }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState("");
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "yzd58rhe");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/diwf1mkhu/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
  };

  const formik = useFormik({
    initialValues: {
      author: user.displayName,
      authorid: user.id,
      title: "",
      content: "",
      image: "",
      date: date,
    },
    onSubmit: async (values, { resetForm }) => {
      // const {image} = formik.values
      // const formData = new FormData()

      //     try{
      //       formData.append("file", image)
      //       formData.append("upload_preset", "yzd58rhe")
      //       const res = await axios.post("https://api.cloudinary.com/v1_1/diwf1mkhu/image/upload", formData)
      //       console.log(res)
      //     const file = await res.json()
      // console.log(file)
      // setImage(file.secure_url)
      //     } catch(error){
      //       console.log(formData)
      //     }

      axios
        .post("https://635fe664ca0fe3c21aa783b3.mockapi.io/posts", {
          title: values.title,
          author: values.author,
          authorid: values.authorid,
          content: values.content,
          date: values.date,
          image,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      resetForm();
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
    <Grid
      container
      pt={20}
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card sx={{ minWidth: 800 }}>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container columnSpacing={1}>
              <Grid item xs={6}>
                <TextField
                  autoFocus
                  fullWidth
                  margin="dense"
                  name="author"
                  label="Author"
                  type="text"
                  variant="filled"
                  value={formik.values.author}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoFocus
                  margin="dense"
                  name="date"
                  label="Date"
                  type="text"
                  variant="filled"
                  value={formik.values.date}
                />
              </Grid>
            </Grid>
            <span hidden>
              <TextField
                autoFocus
                margin="dense"
                name="authorid"
                label="AuthorID"
                type="text"
                fullWidth
                variant="filled"
                value={formik.values.authorid}
              />
            </span>
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
              margin="dense"
              multiline
              rows={6}
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
            <Grid item>
              {image && (
                <div>
                  <img alt="not fount" width={"100px"} src={image} />
                  <br />
                </div>
              )}
              <br />

              <Button
                variant="outlined"
                component="label"
                startIcon={<AddPhotoAlternateIcon />}
                size="small"
              >
                Chọn hình ảnh
                <input
                  accept="image/*"
                  name="image"
                  type="file"
                  hidden
                  // onChange={(event) => {
                  //   setSelectedImage(event.target.files[0]);

                  // }}
                  // onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
                  onChange={uploadImage}
                />
              </Button>
            </Grid>
            <Grid item pt={5}>
              <Button fullWidth variant="contained" size="small" type="submit">
                Post
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
    // <Grid container pt={5} pl={5}>
    // <Card>
    //   <CardContent>
    //     <Formik initialValues={{
    //       name:'',
    //       nation:'',
    //       club:'',
    //       cost:0,
    //       clip:'',
    //       description:'',
    //       img:'',
    //       top:false

    //     }}
    //     validationSchema={object({
    //       name: string().required('Name is required').min(2, 'Name needs to be at lease 2 characters').max(10, 'Name can not be bigger than 10 characters'),
    //       nation: string().required('Nation is required').min(2, 'Nation needs to be at lease 2 characters').max(50, 'Nation can not be bigger than 50 characters'),
    //       club: string().required('Club is required').min(2, 'Club needs to be at lease 2 characters').max(50, 'Club can not be bigger than 50 characters'),
    //       cost: number().required('Cost is required'),
    //       description: string().required('Description is required').min(10, 'Description needs to be at lease 10 characters'),
    //       clip: string().required('Clip is required').min(10, 'Clip needs to be at lease 10 characters'),
    //       img: string().required('Image is required').min(10, 'Image needs to be at lease 10 characters'),

    //     })}
    //     onSubmit={async (values) => {

    //     }}>
    //       {({values,errors,isSubmitting})=>(
    //         <Form autoComplete="off">
    //           <Grid container direction="column" spacing={2}>
    //             <Grid item>
    //               <Field fullWidth name="name" component={TextField} label="Title"/>
    //             </Grid>
    //             <Grid item>
    //               <Field fullWidth name="club" component={TextField} label="Content"/>
    //             </Grid>
    //             <Grid item>
    //               <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" startIcon={isSubmitting ? <CircularProgress size="0.9rem"/> : undefined}>{isSubmitting ? 'Submitting' : 'Submit'}</Button>
    //             </Grid>
    //           </Grid>
    //         </Form>
    //       )}
    //     </Formik>
    //   </CardContent>
    // </Card>
    // </Grid>
  );
};

export default CreatePost;
