import React, { useEffect, useState } from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import axios from "axios";
import { useParams } from 'react-router-dom';
function Post() {
  const [loading, setLoading] = useState(true)

    const [post, setPost] = useState([]);

    let { id } = useParams();

    useEffect(() => {
      setLoading(true);

      axios
        .get(`https://635fe664ca0fe3c21aa783b3.mockapi.io/posts/${id}`)
        .then((res) => {
          console.log(res);
          setPost(res.data);
          setLoading(false);

        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    return (
      loading?(<Grid container pl={8} pt={33} pb={17}>
        <div className="classic-4"></div>

  </Grid>
    ):(
        <div className="post">
            <img className="postImg" src={post.image}/>
            <h1 className="postTitle">{post.title}</h1>
            <p className="postContent">{post.content}</p>
      </div>
    )
    );
}

export default Post
