import React from 'react';


class ListUser extends React.Component {
constructor(props) {
    super(props);

    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleFriendButton = this.handleFriendButton.bind(this);
 };

  handleDeleteButton(){
    this.props.deleteUser(this.props.data.id);
  }

  handleEditButton(){
    this.props.handleEditButton(this.props.indexUser);
  }

  handleFriendButton(){
    this.props.handleFriendButton(this.props.indexUser);
  }
   render() {
      return (
      <div id="try">
           <ul id="listUser">
              <table>
                <tbody>
                  <tr >
                     <td id="imageUser"><img src={this.props.data.photo} width="150" height="160" alt="No image" /></td>
                     <td id="infor"><b> Id User: </b>{this.props.data.id}  <br />
                     <b> First name: </b>{this.props.data.firstName} <br />
                     <b> Last Name: </b>{this.props.data.lastName} <br />
                  </td>
                  </tr>
                </tbody>

              </table>
              <button type="button" onClick={this.handleDeleteButton} className="button success"> Delete</button>
              <button type="button" onClick={this.handleEditButton} className="button success"> Edit </button>
              <button type="button" onClick={this.handleFriendButton} className="button success"> Friend </button>
           </ul>
      </div>
      );
   }
}

export default ListUser;
