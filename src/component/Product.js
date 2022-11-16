import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, Grid, Skeleton } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Product() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    console.log(loading);
    axios
      .get (`https://635fe664ca0fe3c21aa783b3.mockapi.io/posts`)
      .then((res) => {

        setPosts(res.data);
        setLoading(false);

      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  return (
    <Grid container pl={10} pr={10} pt={15}>
                {
            loading?(<Grid container pt={18} pb={17}>
                  <div className="classic-4"></div>

            </Grid>
              ):(
      posts.map((post) => (
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
      ))
      )
    }
    </Grid>
  );
}

export default Product;
