import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import axios from "axios";


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
            <Typography variant="body1"  gutterBottom color="text.secondary">
              {post.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained" fullWidth>Read More</Button>
          </CardActions>
        </Card>
      </Grid>
            ))}
    </Grid>
  );
}

export default Product;
