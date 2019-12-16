import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../App.css'
import { connect } from 'react-redux';
import {  SignIn} from './actions/postActions';
import {Redirect} from 'react-router-dom';


class Signin extends Component {
  constructor(props){
    super(props);
    this.state ={
      UserName:'',
      password:'',
      errors:{
        username:"",
        password:"",
      }
    }
  }
  handleChange=(e)=>{
    e.preventDefault();
    const { name, value } = e.target;
  let errors = this.state.errors;
    switch (name) {
      case 'UserName': 
        errors.username = 
          value.length <1
            ? 'username is Required'
            : '';
        break;
      case 'password': 
        errors.password = 
          value.length <1
            ? 'password is Required'
            : '';
        break;  
        default:
          break;
    }
    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
  })
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  submit = () =>{
    let errors = this.state.errors;
    console.log(this.state)
  if(this.state.UserName.length<6){
    errors.username="Enter valid username";
  }
  if(this.state.password.length<6){
    errors.password="Enter valid password";
  }
  this.setState({errors})
   let data={
    username:this.state.UserName,
    password:this.state.password
   }
   if(this.validateForm(this.state.errors)){
    this.props.SignIn(data)
   }
   
  }
  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  UNSAFE_componentWillReceiveProps(nextProps){
   console.log(nextProps.token)
   this.setState({
     token:nextProps.token
   })
   sessionStorage.setItem("token",nextProps.token);
  }
 
  render() {
    // console.log(this.props.token)
    if(this.props.token){
      console.log(this.props.token)
      return <Redirect to="/dashboard"/>
    }
    return (
      <div>
        (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="form" noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="UserName"
            name="UserName"
            autoComplete="username"
            onChange={this.handleChange}
            value={this.state.UserName}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={this.handleChange}
            value={this.state.password}
          />
         {Object.keys(this.state.errors).map((keyName, i) => (
    <div key={i}>
        <span className="input-label" style={{color:"red"}}>{this.state.errors[keyName]}</span>
    </div>
))}
          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick = {this.submit}
          >
            Sign In
          </Button>
          <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
    </Container>
  );
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token:state.data.token
});

export default connect(mapStateToProps, {SignIn })(Signin);