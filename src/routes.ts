import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/auth/signup-form/signup-form.component';
import { LoginFormComponent } from './app/auth/login-form/login-form.component';
import { ChatroomComponent } from './app/chatroom/chatroom.component';
import { PageNotFoundComponent } from './app/error-pages/page-not-found/page-not-found.component';
import { AuthGuardService } from './app/auth/auth-guard.service';

// Possible future integration with PKMN style RPG fighter, but text based :)
export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'chatto', component: ChatroomComponent, canActivate: [AuthGuardService] },
    { path: 'chat', redirectTo: '/chatto' },
    { path: 'signup', component: SignupFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: '**', component: PageNotFoundComponent }
];
