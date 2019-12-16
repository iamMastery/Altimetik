import React ,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import '../App.css';
import { connect } from 'react-redux';
import { SignUP} from './actions/postActions';
import {Redirect} from 'react-router-dom';
class SignUp extends Component {
  constructor(props){
    super(props);
    this.state ={
      firstName:'',
      lastName:"",
      email:"",
      username:"",
      password:"",
      gender:"male",
      country:"Country",
      countries:["India","Australia","Pakisthan"],
      userCreated:false,
      errors:{
        firstName:'',
        lastName:"",
        email:"",
        username:"",
        password:"",
        gender:"",
        country:"",
      }
    }
  }
  emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  handleChange=(e)=>{
    e.preventDefault();
    const { name, value } = e.target;
  let errors = this.state.errors;
    switch (name) {
      case 'firstName': 
        errors.firstName = 
          value.length <1
            ? 'FirstName is Required'
            : '';
        break;
      case 'lastName': 
        errors.lastName = 
          value.length <1
            ? 'lastName is Required'
            : '';
        break;  
      case 'username': 
        errors.username = 
          value.length <1
            ? 'username is Required'
            : '';
        break;  
      case 'email': 
      
        errors.email = 
          this.emailIsValid(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 6
            ? 'Password must be 6 characters long!'
            : '';
        break;
      case 'gender': 
        errors.username = 
          value.length <1
            ? 'gender is Required'
            : '';
        break;
      case 'country': 
        errors.username = 
          value.length <1 && value==='Country'
            ? 'Please select the country'
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
  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  submit=(event)=>{
    event.preventDefault();
    let errors = this.state.errors;
    console.log(this.state)
  if(this.state.username.length<6){
    errors.username="username must contain atleast 6 characters";
  }
  if(this.state.firstName.length<1){
    errors.firstName="firstName is Required";
  }
  if(this.state.lastName.length<1){
    errors.lastName="lastName is Required";
  }
  if(!this.emailIsValid(this.state.email)){
    errors.email="email is not valid";
  }
  if(this.state.password.length<6){
    errors.password="password character must be greater than 6";
  }
  if(this.state.country==='Country'){
    errors.password="Please select the country ";
    
  }   
  this.setState({errors})
  if(this.validateForm(this.state.errors)) {
    let data={
      username:this.state.username,
      email:this.state.email,
      password:this.state.password,
      gender:this.state.gender,
      firstname:this.state.firstName,
      lastname:this.state.lastName,
      country:this.state.country
     }
     this.props.SignUP(data)
  }else{
    console.error('Invalid Form')
  }
    
  }
 
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.response.user._id){
      this.setState({
        userCreated:true
      })
    }else{
      console.log(nextProps.response.error)
      this.setState({
        error:nextProps.response.error
      })
    }
  }
  render() {
    
    if(this.state.userCreated){
      return <Redirect to="/"/>
    }
    return (
      
      <div>
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={this.handleChange}
                onBlur={this.handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={this.handleChange}
                onBlur={this.handleChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                onChange={this.handleChange}
                onBlur={this.handleChange}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                onChange={this.handleChange}
                onBlur={this.handleChange}
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.handleChange}
                onBlur={this.handleChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" className="formControl">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />

                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl className="formControl">
                <Select
                name="country"
                  value={this.state.country}
                  displayEmpty
                  className="selectEmpty"
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                >
                  <MenuItem value="Country" disabled>
                    Country
                  </MenuItem>
                  
    {this.state.countries.map((country,index)=>{
      return <MenuItem key={index} value={country}  >{country}</MenuItem>
    })}
                  
                </Select>
                <FormHelperText>Country</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid>  

          {Object.keys(this.state.errors).map((keyName, i) => (
    <div key={i}>
        <span className="input-label" style={{color:"red"}}>{this.state.errors[keyName]}</span>
    </div>
))}
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit"
            onClick={this.submit}
            
          >
            Sign Up
          </Button>
          <Button type="reset"  color="primary"
            className="submit" variant="contained">
            Reset
          </Button>
          </Grid>
          <Link href="/" variant="body2">
            Already have an account? Sign in
          </Link>
          
        </form>
      </div>
      
    </Container>
    
      </div>
      
    )
  }
}
const mapStateToProps = state => ({
  response:state.data,
});

export default connect(mapStateToProps, {SignUP })(SignUp);