import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {path:'', loadChildren: () => import('./pages/Auth/auth.module').then((m) => m.AuthModule)},
  
  {path:'chat', loadChildren: () => import('./pages/chat/chat.module').then((m) => m.ChatModule)}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
