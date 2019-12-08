import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
      const posts = res.data.slice(0, 4);
      console.log(posts);
      const updatedPost = posts.map(post => {
        return {
          ...post,
          author: "Fayssal"
        };
      });

      this.setState({ posts: updatedPost });
    });
  }
  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  deleteSelectedData = () => {
    axios
      .delete(
        "https://jsonplaceholder.typicode.com/posts/" +
          this.state.selectedPostId
      )
      .then(res => {
        console.log(res);
      });
  };

  render() {
    const posts = this.state.posts.map(post => {
      return (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      );
    });
    const postId = this.state.selectedPostId;
    let fullPost = null;

    if (postId) {
      const targetedPost = this.state.posts.filter(post => {
        return post.id === postId;
      });
      fullPost = (
        <FullPost
          tPost={targetedPost[0]}
          tDelete={this.deleteSelectedData}
          id={this.state.selectedPostId}
        />
      );
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>{fullPost}</section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
