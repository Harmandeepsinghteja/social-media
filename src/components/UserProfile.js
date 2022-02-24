import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';
const tempUserId = '62126d356938bd457a869fe7';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }
  componentDidMount() {
    // const { match } = this.props;

    // if (match.params.userId) {
    //   // dispatch an action
    //   this.props.dispatch(fetchUserProfile(match.params.userId));
    // }
    this.props.dispatch(fetchUserProfile(tempUserId));
  }

  checkIfUserIsAFriend = () => {
    console.log('this.props', this.props);
    const { friends } = this.props;
    // const { match} = this.props;
    // const UserId = match.params.UserId;
    const userId = tempUserId;
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleAddFriendClick = async () => {
    const userId = tempUserId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added Friend Successfully'
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriendClick = async () => {
    const userId = tempUserId;
    const url = APIUrls.removeFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Remove Friend Successfully'
      });

      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };
  render() {
    const {
      // match: { params },
      profile,
    } = this.props;
    // console.log('this.props', params);
    const user = profile.user;
    const { success, error } = this.state;
    if (profile.inProgress) {
      return <h1>Loading!</h1>;
    }
    const isUserAFriend = this.checkIfUserIsAFriend();
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="btn-grp">
          {!isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove Friend
            </button>
          )}
          {success && (
            <div class="alert success-dialog">{this.state.successMessage}</div>
          )}
          {error && (
            <div class="alert error-dialog"> {error}</div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
