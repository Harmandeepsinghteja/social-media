


import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/posts'
class App extends Component {
  componentDidMount() {
    console.log("dsfsdf")
    this.props.dispatch(fetchPosts());
  }
  render() {
    return (
      <div>
        APP
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }

}



export default connect(mapStateToProps)(App);
