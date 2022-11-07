import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const YourPost = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleClose = () => setOpenDialog(false);
  const postDelete = (id, e) => {
    e.preventDefault();
    axios
      .delete(`https://635fe664ca0fe3c21aa783b3.mockapi.io/posts/${id}`)
      .then((res) => console.log(`Deleted!!!`, res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios
      .get(`https://635fe664ca0fe3c21aa783b3.mockapi.io/posts`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Grid container pl={10} pr={10} pt={20}>
      <Dialog onClose={handleClose} open={openDialog}>
        <DialogTitle>Bạn có chắc chắn muốn xóa sản phẩm này không?</DialogTitle>
        <Grid container p={2}>
          <Button
            size="small"
            color="error"
            onClick={(e) => (postDelete(modalData.id, e), setOpenDialog(false))}
          >
            Có
          </Button>
          <Button size="small" onClick={handleClose}>
            Không
          </Button>
        </Grid>
      </Dialog>
      {posts
        .filter((post) => post.authorid === user.id)
        .map((post) => (
          <Grid key={post.id} item xs={4} pr={2} pt={2} pb={2}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={post.img}
                alt="green iguana"
              />
              <CardContent align="left">
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body1" gutterBottom color="text.secondary">
                  {post.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Grid container>
                  <Grid item xs={12}>
                    <Button size="small" variant="contained" fullWidth>
                      Read More
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <MoreHorizIcon />
                      </AccordionSummary>
                      <AccordionDetails align="left">
                        <Grid container pl={1}>
                          <Grid item xs={12}>
                            <Button startIcon={<EditIcon />}>Edit</Button>
                            <hr />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              startIcon={<DeleteIcon color="error" />}
                              onClick={() => {
                                setOpenDialog(true);
                                setModalData(post);
                              }}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  {/* <Collapse
                      style={{ position: "absolute" }}
                      in={open}
                      timeout="auto"
                      unmountOnExit
                      
                    >
                      <Card align="left" sx={{ width: 120 }}>
                        <Grid container pl={1}>
                          <Grid item xs={12}>
                            <Button startIcon={<EditIcon />}>Edit</Button>
                            <hr />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              startIcon={<DeleteIcon color="error" />}
                              // onClick={fetch(
                              //   `https://635fe664ca0fe3c21aa783b3.mockapi.io/posts/`+post.id,
                              //   {
                              //     method: "DELETE",
                              //   }
                              // )
                              //   .then((res) => res.text()) // or res.json()
                              //   .then((res) => console.log(res))}
                              // onClick={(e) => postDelete(post.id, e)}
                              onClick={() => {
                                setOpenDialog(true);
                                setModalData(post);
                              }}
                            >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                      </Card>
                    </Collapse> */}
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default YourPost;
