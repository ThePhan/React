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
        user.id = this.state.User.length + 1;
        var myArray = this.state.User;
        myArray.push(user);
        this.setState({User: myArray});
    }

    deleteUser(id) {
        // var users = this.state.User.filter(function(user) {
        //     return user.id !== id;
        // });
        //
        // this.setState({User: users});

        console.log(id + " dnsjdksjdksjkdj");
        this.serverRequest = $.ajax({
            url: "http://localhost:8181/user",
            type: "DELETE",
            async: true,
            data: {
                "_id": "id"
            },
            success: function(data) {
                alert("success");
            },
            error: function(error) {
                alert("error :" + error.status);
            }
        });

    }

    updateUser(user, indexUser) {
        var users = this.state.User;
        users[indexUser] = user;
        this.setState({User: users, editUser: {}});
    }

    handleEditButton(index) {
        this.setState({editUser: this.state.User[index], editUserIndex: index});
    }

    handleFriendButton(index) {
        var userFriend = this.state.User[index].friend;
        var arrayFriend = [];
        for (var i = 0; i < userFriend.length; i++) {
            for (var j = 0; j < this.state.User.length; j++) {
                if (userFriend[i] == this.state.User[j].id) {
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

    deleteFriendHandle(idFriend) {
        var friendss = this.state.friends.filter(function(friend) {
            return friend.id !== idFriend;
        });
        this.setState({friends: friendss});
    }

    addFriendHandle(idFriend) {
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
