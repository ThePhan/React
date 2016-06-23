import React from 'react';

class ListFriend extends React.Component {
    constructor(props) {
        super(props);
        this.deleteFriendHandle=this.deleteFriendHandle.bind(this);
    }

    deleteFriendHandle(){
      this.props.deleteFriendHandle(this.props.dataFriend.id);
    }

    render(){
      return(
          <div id="formListFrient">
            <ul>
              <span id="listFriend">{this.props.dataFriend.firstName}</span>
            <button type="button" onClick={this.deleteFriendHandle}> Delete </button>
            </ul>
          </div>
      );
    }
}
export default ListFriend;
