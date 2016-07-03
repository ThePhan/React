import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import List from './User/ListUser.jsx';
import ListFriend from './User/ListFriend.jsx';
import FormUser from './User/FormUser.jsx';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            User: [],
            friends: []
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.handleFriendButton = this.handleFriendButton.bind(this);
        this.deleteFriendHandle = this.deleteFriendHandle.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    };

    componentDidMount() {
        this.serverRequest = $.get("http://localhost:8181/user", function(result) {

            this.setState({User: result});
        }.bind(this));
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    addUser(user) {
        // user._id = new Date().getTime();
        var myArray = this.state.User; // React
        this.serverRequest = $.post("http://localhost:8181/user",
        {"firstName": user.firstName,
        "lastName": user.lastName,
        "photo": user.photo},
        function(result) {
              console.log(result);
              myArray.push(result);
              console.log(result);
        });
        myArray.push(user);//React
        this.setState({User: myArray});//React
    }

    deleteUser(_id) {
      //React
        var users = this.state.User.filter(function(user) {
            return user._id !== _id;
        });
        //data mongo
        this.serverRequest = $.ajax({
            url: "http://localhost:8181/user",
            type: 'DELETE',
            dataType: 'json',
            data: {
                "_id": _id,
            }
        });
        this.setState({User: users});
    }
// update user coplete
    updateUser(user, indexUser) {
        var users = this.state.User;// get list user
        users[indexUser] = user;// get infor user from index user
          this.serverRequest = $.ajax({
          url: 'http://localhost:8181/user',
          method: 'PUT',
          dataType: 'json',
          data: {
                  "firstName": user.firstName,
                  "lastName": user.lastName,
                  "photo": user.photo,
                  "_id": user._id
                },
          success: function(err, result){
            // alert(result.status);
          }
        });
        this.setState({User: users, editUser: {}});
    }

    handleEditButton(index) {
      //get editUser to set value for "user":use for update, delete, addfriend, delete friend
        this.setState({editUser: this.state.User[index], editUserIndex: index});
    }
//Show list friend of user
    handleFriendButton(index) {
        var userFriend = this.state.User[index].friends;//index of user
        var idUser = this.state.User[index]._id;// id user
        var arrayFriend = [];
        for (var i = 0; i < userFriend.length; i++) {
            for (var j = 0; j < this.state.User.length; j++) {
                if (userFriend[i] === this.state.User[j]._id) {
                    var nameFriend = {
                      // use idUser to delete friend from list friend by id user
                        "idUser": idUser,
                        "_idFriend": this.state.User[j]._id,
                        "firstName": this.state.User[j].firstName,
                        "lastName": this.state.User[j].lastName,
                    };
                }
            }
            arrayFriend.push(nameFriend);
        }

        this.setState({friends: arrayFriend})
    }

    deleteFriendHandle(idFriend, _id) {
        var friendss = this.state.friends.filter(function(friend) {
            return friend._idFriend !== idFriend;
        });
          this.serverRequest = $.ajax({
            url: "http://localhost:8181/friend",
            type: 'DELETE',
            dataType: 'json',
            data: {
                "_id": _id,
                "idFriend": idFriend
            }
        });
        this.setState({friends: friendss});
    }

//show list user o add friend
    addFriendHandle(idUser) {// ID
        this.setState({friends: this.state.User});
    }
//add friend from list user was show by addFriendHandle
    addFriend(idFriend, idUsers){
      var friendss = this.state.friends.filter(function(friend) {
          return friend._idFriend !== idFriend;
      });
        this.serverRequest = $.ajax({
          url: "http://localhost:8181/friend",
          type: 'POST',
          dataType: 'json',
          data: {
              "_id": idUsers,
              "idFriend": idFriend
          }
      });
      this.setState({friends: friendss});
    }

    render() {
        return (
            <div>
                <FormUser addUser={this.addUser} updateUser={this.updateUser} user={this.state.editUser} indexUser={this.state.editUserIndex}></FormUser>

                {this.state.friends.map(function(friend, i) {
                    return (<ListFriend key={i} dataFriend={friend} addFriend={this.addFriend} deleteFriendHandle={this.deleteFriendHandle} />)
                }, this)}
                {this.state.User.map(function(person, i) {
                    return (<List addFriendHandle={this.addFriendHandle.bind(this)} handleEditButton={this.handleEditButton} handleFriendButton={this.handleFriendButton} deleteUser={this.deleteUser} key={i} data={person} indexUser={i}/>)
                }, this)}

            </div>
        );
    }
}
export default App;
