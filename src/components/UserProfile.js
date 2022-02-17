import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.user.name,
    };
  }

  handleChange = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };

  render() {
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
          <div className="field-value">Some Name</div>
        </div>

        <div className="field">
          <div className="field-label">Enail</div>
          <div className="field-value">test@mail.com</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn">Add Friends</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(UserProfile);
