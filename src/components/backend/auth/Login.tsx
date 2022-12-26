import { Button, Container, FormControl, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useContext } from 'react';
import { Redirect, RouteComponentProps, useHistory } from 'react-router-dom';
import { login } from '../../../auth/authenticationSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import '../../../styles/auth/Login.css';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface LoginProps extends RouteComponentProps<any> {}

const theme = createTheme();

const Login = (props: LoginProps) => {
  const { location } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);

  const { from } = (location.state as any) || {
    from: { pathname: '/', search: location.search },
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);
    const result = await dispatch(login(username, password));
    if (result?.payload?.data) {
      
      history.push(from);
    } else {
      console.log(result);
    }
  };

  const Form = () => {
    return (
      <Grid md={6} margin={2} padding={2}>
        <div className="label">
          <h1>Trang quản lý cho admin</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              autoComplete="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="Mật khẩu"
              type="password"
              autoComplete="current-password"
            />
          </FormControl>
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ my: 2, py: 1.5, width: 300, ml: 8 }}
            disabled={loading}
          >
            {loading && <span className="spinner-border spinner-border-sm"></span>}
            Đăng nhập
          </Button>
        </form>
        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
        <br/>
        <br/>
        <div className="info">
          <p>
            Tổng đài hỗ trợ khách hàng: <span>1900 1090</span>
            <br />
            <br />
            Hỗ trợ khách hàng các ngày trong tuần từ thứ 2 đến Chủ nhật
            {'('}từ 8h00 – 22h00 hàng ngày{')'}
          </p>
        </div>
      </Grid>
    );
  };

  return !isAuthenticated ? (
    <div className="body-sign-in">
      <Container>
        <Grid container>
          <Grid item sm={2} md={1} lg={1} />
          <Grid item xs={12} sm={8} md={10} lg={10} sx={{ boxShadow: 2, borderRadius: '3px' }}>
            <div className="area-login">
              <Grid md={12} sm={12} xs={12} sx={{ borderRadius: '3px' }}>
                <div className="form-login">
                  <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                    <Grid
                      md={6}
                      item
                      xs={false}
                      sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                          t.palette.mode === 'light'
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderTopLeftRadius: '3px',
                        borderBottomLeftRadius: '3px',
                        boxShadow: 2
                      }}
                    ></Grid>
                    <Form />
                  </Box>
                </div>
              </Grid>
            </div>
          </Grid>
          <Grid item sm={2} md={1} lg={1} />
        </Grid>
      </Container>
    </div>
  ) : (
    <Redirect to={from} />
  );
};

export default Login;
