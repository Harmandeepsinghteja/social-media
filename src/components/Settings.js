import React, { Component } from 'react';
import { connect } from 'react-redux';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      confirm_password: '',
      editMode: false,
    };
  }
  render() {
    const { user } = this.props.auth;
    const { editMode } = this.state;
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
          <div className="field-label">Email</div>
          <div className="field-label">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">name</div>
          {editMode ? (
            <input
              type="text"
              onChange={() => this.handleChange()}
              value={this.state.name}
            ></input>
          ) : (
            <div className="field-label">{user.name}</div>
          )}
        </div>

        {editMode && (
          <div className="field">
            <div className="field-label">New Password</div>
            <input
              type="password"
              onChange={() => this.handleChange()}
              value={this.state.password}
            ></input>
          </div>
        )}

        {editMode && (
          <div className="field">
            <div className="field-label">Confirm Password</div>
            <input
              type="password"
              onChange={() => this.handleChange()}
              value={this.state.confirmPassword}
            ></input>
          </div>
        )}
        <div className="btn-grp">
          {editMode ? (
            <button className="button save-btn">Save</button>
          ) : (
            <button className="button save-btn">Edit Profile</button>
          )}
        </div>

        {editMode && <div className="go=back">Go Back</div>}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Settings);