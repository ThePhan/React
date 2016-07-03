import React from 'react';

class ListFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              idUsers: this.props.idUsers
          }
       this.deleteFriendHandle=this.deleteFriendHandle.bind(this);
          // this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillReceiveProps(nextProps){
      this.setState({
          idUsers: nextProps.idUsers
      })
    }

    deleteFriendHandle(){
      //
      // if(this.state.idUsers){
      //     this.props.deleteFriendHandle(this.props.dataFriend._id);
      //     this.props.addFriend(this.state.user, this.props.indexUser);
      //   } else {
          this.props.deleteFriendHandle(this.props.dataFriend._idFriend, this.props.dataFriend.idUser);
        // }
    }

    addFriend(){
      this.props.addFriend(this.props.dataFriend._idFriend, this.props.dataFriend.idUser);
    }

    render(){
      return(
          <div id="formListFrient">
            <ul>
              <span id="listFriend">{this.props.dataFriend.firstName} {this.props.dataFriend.lastName}</span>

            <button type="button" onClick={this.deleteFriendHandle} className="button success">Delete friend</button>
            <button type="button" onClick={this.addFriend.bind(this)} className="button success">ADD</button>
            </ul>
          </div>
      );
    }
}
export default ListFriend;
