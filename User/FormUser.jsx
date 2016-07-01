import React from 'react';


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
          if(this.state.user.id){
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
                <p ><b>FirstName</b> <input type="text" placeholder="input first name..." value={this.state.user.firstName || ''} onChange={this.handleOnchange.bind(this, 'firstName')} /> <br /></p>
                <p ><b>LastName </b> <input type="text" width="350px" placeholder="input last name...." value={this.state.user.lastName || ''} onChange={this.handleOnchange.bind(this, 'lastName')} /> <br /></p>
                <p ><b><span id="photo" >Photo</span> </b> <input type="text" placeholder="input link photo...." value={this.state.user.photo || ''} onChange={this.handleOnchange.bind(this, 'photo')} /> <br /></p>
                <button onClick={this.handleSubmit} className="button success">{this.state.user.id ? 'Update' : 'Add user'}</button> <br />
              </div>
            </div>
        )
    }
}
export default FormUser;
