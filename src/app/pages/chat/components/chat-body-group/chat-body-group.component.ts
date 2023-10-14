import { Component, Input, OnInit } from '@angular/core';
import { Messages } from '../../model/Messages';

@Component({
  selector: 'app-chat-body-group',
  templateUrl: './chat-body-group.component.html',
  styleUrls: ['./chat-body-group.component.css']
})
export class ChatBodyGroupComponent implements OnInit {

  @Input() allMessages : Messages[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
