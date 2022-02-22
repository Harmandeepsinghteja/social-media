import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';

class UserProfile extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: props.auth.user.name,
  //   };
  // }

  componentDidMount() {
    const {match} = this.props;
    if(match.params.userId) {
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  handleChange = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };

  render() {
    console.log(this.props);
    const { profile} = this.props;
    const user = profile.user;

    if(profile.inProgress) {
      return <h1>Loading</h1>
    }
    // console.log('params', params);
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
            id="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Enail</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add Friends</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  return {
    profile,
  };
}

export default connect(mapStateToProps)(UserProfile);
