import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

function Product() {
  const [posts, setPosts] = useState([]);

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
      {posts.map((post) => (
        <Grid key={post.id} item xs={4} pr={2} pt={2} pb={2}>
          <Link style={{ textDecoration: "none" }} to={`/post/${post.id}`}>
            <Card sx={{ maxWidth: 400 }}>
              <CardHeader
                align="left"
                title={
                  <Typography variant="body1">
                    {post.author}
                  </Typography>
                }
                subheader={
                  <Typography variant="body2" color="text.secondary">
                  {post.date}
                </Typography>
                }
              />
              <CardMedia
                component="img"
                height="194"
                image={post.image}
                alt="green iguana"
              />
              <CardContent align="left">
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default Product;
