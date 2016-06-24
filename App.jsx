import React from 'react';
import List from './User/ListUser.jsx';
import ListFriend from './User/ListFriend.jsx';
import FormUser from './User/FormUser.jsx';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            User: [
                {
                    "id": 1,
                    "firstName": "Tom",
                    "lastName": "Cruise",
                    "photo": "http://cdn2.gossipcenter.com/sites/default/files/imagecache/story_header/photos/tom-cruise-020514sp.jpg",
                    "friend": [2, 3]
                }, {
                    "id": 2,
                    "firstName": "Maria",
                    "lastName": "Sharapova",
                    "photo": "http://thewallmachine.com/files/1363603040.jpg",
                    "friend": [3]
                }, {
                    "id": 3,
                    "firstName": "James",
                    "lastName": "Bond",
                    "photo": "http://georgesjournal.files.wordpress.com/2012/02/007_at_50_ge_pierece_brosnan.jpg",
                    "friend": [1]
                }
            ],
            friends:[]
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleFriendButton = this.handleFriendButton.bind(this);
        this.deleteFriendHandle = this.deleteFriendHandle.bind(this);
    };

    addUser(user){
      user.id = this.state.User.length + 1;
      var myArray = this.state.User;
      myArray.push(user);
      this.setState({
          User: myArray
      });
    }

    deleteUser(id) {
        var users = this.state.User.filter(function(user) {
            return user.id !== id;
        });
        this.setState({User: users});
    }

    updateUser(user, indexUser) {
      var users = this.state.User;
      users[indexUser] = user;
      this.setState({
        User: users,
        editUser: {}
      });
    }

    handleEditButton(index){
        this.setState({
            editUser: this.state.User[index],
            editUserIndex: index
        });
    }

    handleFriendButton(index){
      var userFriend = this.state.User[index].friend;
      var arrayFriend=[];
      for (var i = 0; i<userFriend.length; i++){
        for(var j = 0; j <this.state.User.length; j++){
          if(userFriend[i] == this.state.User[j].id){
            var nameFriend = {
              "id": this.state.User[j].id,
              "firstName": this.state.User[j].firstName
            };
          }
        }
        arrayFriend.push(nameFriend);
      }

      this.setState({friends: arrayFriend})
    }

    deleteFriendHandle(idFriend){
      var friendss = this.state.friends.filter(function(friend){
        return friend.id !== idFriend;
      });
      this.setState({friends:friendss});
    }

    addFriendHandle(idFriend){
        this.setState({arrayUser: this.state.User});
    }

    render() {
        return (
            <div>
                <FormUser addUser={this.addUser.bind(this)} updateUser={this.updateUser} user={this.state.editUser} indexUser={this.state.editUserIndex}></FormUser>

                {this.state.friends.map(function(friend, i) {
                    return (<ListFriend key={i} dataFriend={friend} deleteFriendHandle={this.deleteFriendHandle} arrayUser={this.state.arrayUser} addFriendHandle={this.addFriendHandle.bind(this)}/>)
                }, this)}
                {this.state.User.map(function(person, i) {
                    return (<List handleEditButton={this.handleEditButton} handleFriendButton={this.handleFriendButton} deleteUser={this.deleteUser} key={i} data={person} indexUser={i}/>)
                }, this)}

            </div>
        );
    }
}
export default App;
