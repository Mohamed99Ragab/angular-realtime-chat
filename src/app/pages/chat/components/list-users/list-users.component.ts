import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../model/User';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  @Input() usersList: User[] = [];
  @Input() authUser: User;
  @Input() messageNotification: EventEmitter<any>;
  @Output() selectedAuthUser = new EventEmitter<User>();
  notifyNewMessage: any;
  userActive = false;

  constructor() { }

  ngOnInit(): void {
    console.log('the authUser : ', this.authUser);
    this.messageNotification.subscribe(msg => {
      this.notifyNewMessage = msg;
    });
  }

  changeToGroupChat() {
    const user: any = null;
    this.selectedAuthUser.emit(user);
  }

  selectUser(user:User) {
    if (user.id === this.authUser.id) {
      return;
    }
    if (this.notifyNewMessage) {
      this.notifyNewMessage.newMessage = false;
    }
    this.selectedAuthUser.emit(user);
  }

}
