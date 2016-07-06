import React from 'react';
import {Button} from 'react-bootstrap';
import {FormGroup} from 'react-bootstrap';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {ControlLabel} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
class FormUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user || {}
        }

        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    };

    componentWillReceiveProps(nextProps){
      this.setState({
          user: nextProps.user || {}
      })
    }

    handleOnchange(field, e) {
      var user = this.state.user;
      user[field] = e.target.value;
      this.setState({User: user});
    }

    handleSubmit(e){
      if (this.state.user.firstName == null || this.state.user.lastName == null)
      {
        alert("please type infor ......");
      }
      else{
          if(this.state.user._id){
            this.props.updateUser(this.state.user, this.props.indexUser);
          } else {
            this.props.addUser(this.state.user);
          }
      }
    }

    render() {
        return (
            <div id="formUser">
              <p id="titleUser"> MANARGER USER </p>
              <div id="subFormUser">
                <FormGroup bsSize="large" className="formGroup">
                <InputGroup id="inputGroup">
                  <InputGroup.Addon><Glyphicon glyph="user"/></InputGroup.Addon>
                  <FormControl type="text" placeholder="input first name..." value={this.state.user.firstName || ''} onChange={this.handleOnchange.bind(this, 'firstName')}/>
                </InputGroup>
                <InputGroup id="inputGroup">
                  <InputGroup.Addon><Glyphicon glyph="user"/></InputGroup.Addon>
                  <FormControl type="text" placeholder="input last name...." value={this.state.user.lastName || ''} onChange={this.handleOnchange.bind(this, 'lastName')} />
                </InputGroup>
                <InputGroup id="inputGroup">
                  <InputGroup.Addon><Glyphicon glyph="camera"/></InputGroup.Addon>
                  <FormControl type="text" placeholder="input link photo...." value={this.state.user.photo || ''} onChange={this.handleOnchange.bind(this, 'photo')} />
                </InputGroup>
                </FormGroup>
                <Button bsStyle="success" bsSize="large" onClick={this.handleSubmit} ><Glyphicon glyph="leaf"/> {this.state.user._id ? 'Update' : 'Add user'}</Button> <br />
              </div>
            </div>
        )
    }
}
export default FormUser;
