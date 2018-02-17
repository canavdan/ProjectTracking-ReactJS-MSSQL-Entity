import React from 'react';
import { Redirect } from 'react-router-dom';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: props.name };
    alert(localStorage.getItem('roleName'));
  }

  render() {
    return (
      <div>
        {' '}{(function () {
          switch ("member") {
            case 'member':
              if (
                localStorage.getItem('roleName').replace(/"/g, '') !== 'Uye' &&
                localStorage.getItem('roleName').replace(/"/g, '') !== 'Sirket'
              ) {
                return (
                  <Redirect
                    to={{
                      pathname: '/',
                    }}
                  />
                );
              }
            case 'admin':
              if (
                localStorage.getItem('roleName').replace(/"/g, '') != 'Admin' &&
                localStorage.getItem('roleName').replace(/"/g, '') != 'Calisan'
              ) {
                return (
                  <Redirect
                    to={{
                      pathname: '/',
                    }}
                  />
                );
              }
            default:
              return null;
          }
        }())}{' '}
      </div>
    );
  }
}

export default Auth;
