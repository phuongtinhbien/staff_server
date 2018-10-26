import React from 'react';
import LoginForm from './LoginForm';

const Login = () => (
  <div>
    <div className="row">
      <div className="col-md-6">
        <LoginForm  onSubmit={values => alert('Enter values: ' + JSON.stringify(values, null, 2))} />
      </div>
    </div>
  </div>
);

export default Login;