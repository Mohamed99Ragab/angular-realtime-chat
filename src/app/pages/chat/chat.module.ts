import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { ChatBodyGroupComponent } from './components/chat-body-group/chat-body-group.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatBodyPrivateComponent } from './components/chat-body-private/chat-body-private.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatBodyGroupComponent,
    ListUsersComponent,
    ChatBodyPrivateComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }
