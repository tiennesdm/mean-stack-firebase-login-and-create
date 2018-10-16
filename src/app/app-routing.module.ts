import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CryptoCreateComponent } from './crypto-form/crypto-create-form/crypto-create.component';
import { CryptoListComponent } from './crypto-form/crypto-list-form/crypto-list.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'crypto', component : CryptoCreateComponent, canActivate: [AuthGuard]},
  { path: 'list', component : CryptoListComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
