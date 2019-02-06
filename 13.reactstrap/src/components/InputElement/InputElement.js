import React, { Component } from 'react';
import { FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';


class InputElement extends Component {
  state = {
    error: null,
  }

  changeHandler = (e) => {
    e.preventDefault();
    let regx, field = e.target;
    switch (field.name) {
      case 'username':
        regx = /^([a-zA-Z]+[a-zA-Z0-9_]*)$/;
        break;
      case 'email':
        regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        break;
      case 'password':
        regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        break;
      case 'mobile':
        regx = /^[0-9]{10}$/;
        break;
      default:
        return;
    }
    if (regx.test(field.value)) {
      this.setState({ error: false });
      this.props.changeEvent([field.value,true]);
    }
    else {
      this.setState({ error: true });
      this.props.changeEvent([field.value,false]);
    }

  }

  displayDescription() {
    switch (this.props.name) {
      case 'username':
        return <FormText>Username should starts with letter. ex. John_123</FormText>
      case 'email':
        return <FormText>ex. john@business.com</FormText>
      case 'password':
        return <FormText>Password should contain digit, letter, special character. <br /> Length should be between 6 to 16</FormText>
      case 'mobile':
        return <FormText>Enter 10 digits mobile number.</FormText>
      default: return
    }
  }

  render() {
    let { name, type, description } = this.props;
    let error = this.state.error;
    let valid = error === null ? {} : (error ? { invalid: 'true' } : { valid: 'true' });
    return (
      <FormGroup>
        <Label for={name}>{description}</Label>
        <Input
          name={name}
          type={type}
          {...valid}
          onChange={(e) => this.changeHandler(e)}
        />
        {
          error ?
            <FormFeedback
              {...valid}>
              Please enter valid {name}.</FormFeedback>
            : error === 'false'
              ?
              <FormFeedback
                {...valid}>
                Entered {name} is valid.</FormFeedback>
              : null
        }
        {this.displayDescription()}
      </FormGroup>
    );
  }
}

export default InputElement;