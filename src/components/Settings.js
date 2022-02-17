import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearAuthState, editUser } from '../actions/auth';
import { getAuthtokenFromLocalStorage } from '../helpers/utils';
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.user.name,
      password: '',
      confirm_password: '',
      editMode: false,
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handleChange = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };
  handleSave = () => {
    console.log('$$', getAuthtokenFromLocalStorage());
    const { password, confirmPassword, name } = this.state;
    const { user } = this.props.auth;
    this.props.dispatch(editUser(name, password, confirmPassword, user._id));
  };
  render() {
    const { user, error } = this.props.auth;
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
        {error && <div className="alert error-dialog">{error} </div>}
        {error === false && (
          <div className="alert success-dialog">
            Successfull Updated Profile
          </div>
        )}

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-label">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">name</div>
          {editMode ? (
            <input
              type="text"
              onChange={(e) => this.handleChange('name', e.target.value)}
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
              onChange={(e) => this.handleChange('password', e.target.value)}
              value={this.state.password}
            ></input>
          </div>
        )}

        {editMode && (
          <div className="field">
            <div className="field-label">Confirm Password</div>
            <input
              type="password"
              onChange={(e) =>
                this.handleChange('confirmPassword', e.target.value)
              }
              value={this.state.confirmPassword}
            ></input>
          </div>
        )}
        <div className="btn-grp">
          {editMode ? (
            <button className="button save-btn" /*onClick={() => this.handleSave()} */>
              Save
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={() => this.handleChange('editMode', true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        {editMode && (
          <div
            className="go=back"
            onClick={() => this.handleChange('editMode', false)}
          >
            Go Back
          </div>
        )}
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
