import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link , Route , Routes} from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import { fetchPosts } from '../actions/posts';
import  PostsList   from './PostsList';
// import {Home,Navbar} from '.';
import  Home  from './Home';
import  Navbar  from './Navbar';
import Page404 from './Page404';
import Login  from './Login';
import  Signup  from './Signup';
import { authenticateUser } from '../actions/auth';
// const Home = () => {
// return <div>Home</div>
// }





class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');

    if(token) {
      const user = jwtDecode(token);
      console.log(user);
      this.props.dispatch(authenticateUser({
        email: user.email,
        _id: user._id,
        name: user.name
      }))
    }
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Home posts={posts} />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route  element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
