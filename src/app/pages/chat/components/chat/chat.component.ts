import { AuthService } from 'src/app/core/services/auth.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import Echo from 'laravel-echo';
import { ChatService } from '../../services/chat.service';
import { Messages } from '../../model/Messages';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/User';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  echo:Echo;
  authUser:User;
  users: User[] = [];
  selectedUser: User;
  messageNotification = new EventEmitter<{ newMessage: boolean, senderId: string, receiveId: string}>();
  groupMessages: Messages[] = [];
  privateMessages: Messages[] = [];

  chatForm:FormGroup = new FormGroup({
    message:new FormControl('',[Validators.required])
  })




  constructor(private chatService: ChatService, public _AuthService:AuthService) {
    this.getSocketsId();

    this.authUser  = this._AuthService.user;
    this.getPrivateChat();

  }


  ngOnInit(): void {
    this.joinChat();
    this.getGroupChat();
  }

  getSelectedAuthUser(event:any) {
    // console.log('user is : ', event);
    this.selectedUser = event;
  }


  getSocketsId() {
    this.echo = this.chatService.getSockets();
  }


  joinChat() {
    this.echo.join(`chat`)
      .here((users:User[]) => {
        this.users = users;
        this.users = this.users.filter(user => {
          return user.id !== this.authUser.id;
        });
        console.log('users here : ', this.users);
      })
      .joining((user:User) => {
        console.log('join : ', user.name, user);
        this.users.push(user);
      })
      .leaving((user:User) => {
        console.log('Leave : ', user.name, user);
        this.users = this.users.filter(userList => {
          return user.id !== userList.id;
        });
        console.log('new users : ', this.users);
      })
      .error((error:any) => {
        console.error(error);
      });
  }

  getGroupChat() {
    this.echo.private('chat')
      .listen('ChatEvent', (res:any) => {
        const message: Messages = {
          message: res.message,
          me: false,
          from: res.from
        };
        this.groupMessages.push(message);
      });
  }



  sendGroupMessage() {
    if (this.chatForm.valid) {
      const socketId = this.echo.socketId();
      this.chatService.sendMessage(this.chatForm.value, socketId).subscribe(data => console.log('subscribe data : ', data));
      const message: Messages = {
        message: this.chatForm.get('message')?.value,
        me: true,
        from: 'You'
      };
      this.chatForm.get('message')?.reset();
      this.groupMessages.push(message);
    }
  }


  getPrivateChat() {
    const userAuthId = this.authUser.id;
    this.echo.private('channel-direct-message.' + userAuthId)   // channel-direct-message.id
      .listen('ChatDirectMessageEvent', (res:any) => {
        const message: Messages = {
          message: res.response.message,
          me: false,
          from: res.response.from.name,
          senderId: res.response.from.id,
          receiveId: res.response.authUserId
        };
        const msgNotification = {
          newMessage: true,
          senderId: res.response.from.id,
          receiveId: res.response.authUserId
        };

        this.privateMessages.push(message);
        this.messageNotification.emit(msgNotification);
        console.log('Get Private message from chat : ', this.privateMessages);
      });
  }

  sendPrivateMessage() {
    // Rami authUserId = 1;     channel-direct-message.1
    // Kenan authUserId = 2;    channel-direct-message.2
    const socketId = this.echo.socketId();
    const selectedID = this.selectedUser.id!;     // selectUserId = 2
    this.chatService.sendDirectMessage(this.chatForm.get('message')?.value, selectedID, socketId)
      .subscribe(data => console.log('subscribe data : ', data) );
    const message: Messages = {
      message: this.chatForm.get('message')?.value,
      me: true,
      from: 'You',
      senderId: this.authUser.id,
      receiveId: selectedID
    };
    this.chatForm.get('message')?.reset();
    this.privateMessages.push(message);
    console.log('Send Private message from chat : ', this.privateMessages);
    // this.getPrivateChat();
  }

}
