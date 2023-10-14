import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { Messages } from '../../model/Messages';

@Component({
  selector: 'app-chat-body-private',
  templateUrl: './chat-body-private.component.html',
  styleUrls: ['./chat-body-private.component.css']
})
export class ChatBodyPrivateComponent implements OnInit {

  @Input() selectedUser: User;
  @Input() authUser: User;
  @Input() allMessages: Messages[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
