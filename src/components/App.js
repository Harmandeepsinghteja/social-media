import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchPosts } from '../actions/posts';
import PostsList from './PostsList';
// import {Home,Navbar} from '.';
import Home from './Home';
import Navbar from './Navbar';
import Page404 from './Page404';
import Login from './Login';
import Signup from './Signup';
import Settings from './Settings';
import UserProfile from './UserProfile';
import  jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';

// const PrivateRoute = (privateRouteProps) => {
//   const { isLoggedin, path, component: Component } = privateRouteProps;

//   return (
//     <Route
//       path={path}
//       render={(props) => {
//         console.log('props', props);
//         console.log('isLoggedin', isLoggedin);
//         return isLoggedin ? (
//           <Component {...props} />
//         ) : (
//           <Navigate
//             to={{
//               pathname: '/login',
//               state: {
//                 from: props.location,
//               },
//             }}
//           />
//         );
//       }}
//     />
//   );
// };

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = getAuthTokenFromLocalStorage();

    if (token) {
      const user = jwtDecode(token);

      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );

      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          <Navbar />

          <Routes>
            {/* <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
              }}
            /> */}
            <Route
              exact
              path="/"
              element={
                <Home
                  props={this.props}
                  posts={posts}
                  friends={friends}
                  isLoggedin={auth.isLoggedin}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/user/:userId"
              element={<UserProfile />}
              isLoggedin={auth.isLoggedin}
            />
            <Route
              path="/settings"
              element={<Settings />}
              isLoggedin={auth.isLoggedin}
            />

            <Route element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
