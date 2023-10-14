import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AuthRoutingModule } from '../pages/Auth/auth-routing.module';



@NgModule({
  declarations: [
  HeaderComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports:[
    HeaderComponent,
  ]
})
export class SharedModule { }
