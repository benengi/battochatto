import { Routes } from '@angular/router';
import { SignupFormComponent } from './auth/signup-form/signup-form.component';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { PatchNotesComponent } from './dev-messages/patch-notes/patch-notes.component';

// Possible future integration with PKMN style RPG fighter, but text based :)
export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'chatto', component: ChatroomComponent, canActivate: [AuthGuardService] },
    { path: 'chat', redirectTo: '/chatto' },
    { path: 'patch_notes', component: PatchNotesComponent },
    { path: 'signup', component: SignupFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: '**', component: PageNotFoundComponent }
];
