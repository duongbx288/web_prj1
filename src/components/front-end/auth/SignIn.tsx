import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import { Navigate, useNavigate } from 'react-router-dom';
import './SignIn.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { login } from '../../../auth/authenticationSlice';
import { Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import UserService from '../../../services/UserService';

const SignIn = () => {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
  console.log(isAuthenticated);
  // loading state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // dialog
  const [open, setOpen] = useState<boolean>(false);

  // Login state
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Register state
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newName, setNewName] = useState<string>('');

  // const { from } = (location.state as any) || {
  //   from: { pathname: '/main', search: location.search },
  // };

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  const handleSignUp = async (event: any) => {
    const info = {
      username: newUsername,
      password: newPassword,
      email: newEmail,
      name: newName
    }
    UserService.saveUserInfo(info).then((res) => {
      if(typeof res === 'undefined'){
        return;
      } else if (res.data === '') {
        setTimeout(function () {
          console.log('df');
        }, 3000);
      } else {
        console.log(res.data);
        newLogin(newUsername, newPassword);
      }
    })
  }

  const newLogin = async (username: string, password: string) => {
    const result = await dispatch(login(username, password));
    if (result?.payload?.data) {
      navigate('/main');
    } else {
      console.log(result);
    }
  }

  const handleSubmit = async (event: any) => {
    const result = await dispatch(login(username, password));
    if (result?.payload?.data) {
      navigate('/main');
    } else {
      console.log(result);
    }
  };

  return !isAuthenticated ? (
    <>
      <MDBContainer
        fluid
        className="body-sign-in p-3 h-custom d-flex align-items-center justify-content-center"
      >
        <MDBRow
          center
          style={{
            background: '#fff',
            width: '75vw',
            borderRadius: '5px',
            padding: '15px',
          }}
        >
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </MDBCol>
          <MDBCol col="4" md="6">
            <MDBTabs
              pills
              justify
              className="mb-3 d-flex flex-row justify-content-between"
            >
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleJustifyClick('tab1')}
                  active={justifyActive === 'tab1'}
                >
                  Login
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleJustifyClick('tab2')}
                  active={justifyActive === 'tab2'}
                >
                  Register
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
              <MDBTabsPane show={justifyActive === 'tab1'}>
                <div className="text-center mb-3">
                  <p>Sign in with:</p>

                  <div
                    className="d-flex justify-content-between mx-auto"
                    style={{ width: '40%' }}
                  >
                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="facebook-f" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="twitter" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="google" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="github" size="sm" />
                    </MDBBtn>
                  </div>

                  <p className="text-center mt-3">or:</p>
                </div>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="form1"
                  type="email"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form2"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                />

                <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Remember me"
                  />
                  <a href="!#">Forgot password?</a>
                </div>

                <MDBBtn className="mb-4 w-100" onClick={handleSubmit}>
                  Sign in
                </MDBBtn>
                <p className="text-center">
                  Not a member? <a href="#!">Register</a>
                </p>
              </MDBTabsPane>

              <MDBTabsPane show={justifyActive === 'tab2'}>
                <div className="text-center mb-3">
                  <p>Sign un with:</p>

                  <div
                    className="d-flex justify-content-between mx-auto"
                    style={{ width: '40%' }}
                  >
                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="facebook-f" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="twitter" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="google" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: '#1266f1' }}
                    >
                      <MDBIcon fab icon="github" size="sm" />
                    </MDBBtn>
                  </div>

                  <p className="text-center mt-3">or:</p>
                </div>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Name"
                  id="form1"
                  type="text"
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Username"
                  id="form1"
                  type="text"
                  onChange={(e) => {
                    setNewUsername(e.target.value);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email"
                  id="form1"
                  type="email"
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form1"
                  type="password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />

                <div className="d-flex justify-content-center mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    label="I have read and agree to the terms"
                  />
                </div>

                <MDBBtn className="mb-4 w-100" onClick={handleSignUp}>Sign up</MDBBtn>
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <Typography>{`Error ${error}`}</Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  ) : (
    <Navigate to={'/main'} replace />
  );
};

export default SignIn;
