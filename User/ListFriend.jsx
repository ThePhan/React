import React from 'react';

class ListFriend extends React.Component {
    constructor(props) {
        super(props);
        this.deleteFriendHandle=this.deleteFriendHandle.bind(this);
    }

    deleteFriendHandle(){
      this.props.deleteFriendHandle(this.props.dataFriend._id, this.props.dataFriend.idUser);
    }

    addFriendHandle(){
      this.props.addFriendHandle(this.props.dataFriend._id);
    }

    render(){
      return(
          <div id="formListFrient">
            <ul>
              <span id="listFriend">{this.props.dataFriend.firstName} {this.props.dataFriend.lastName}</span>
            <button type="button" onClick={this.addFriendHandle.bind(this)}> Add friend </button>
            <button type="button" onClick={this.deleteFriendHandle}> Delete </button>
            </ul>
          </div>
      );
    }
}
export default ListFriend;
