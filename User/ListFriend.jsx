import React from 'react';

class ListFriend extends React.Component {
    constructor(props) {
        super(props);

       this.deleteFriendHandle=this.deleteFriendHandle.bind(this);
    };

    deleteFriendHandle(){
      this.props.deleteFriendHandle(this.props.dataFriend._idFriend, this.props.dataFriend.idUser);
    }

    render(){
      return(
          <div id="formListFrient">
            <ul>
              <span id="listFriend">{this.props.dataFriend.firstName} {this.props.dataFriend.lastName}</span>

            <button type="button" onClick={this.deleteFriendHandle} className="button success">Delete friend</button>

            </ul>
          </div>
      );
    }
}
export default ListFriend;
