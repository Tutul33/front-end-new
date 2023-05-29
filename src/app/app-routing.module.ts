import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/commonServices/auth.guard';
import { SinglePostComponent } from './posts/single-post/single-post.component';
const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'counter',
    loadChildren:()=>import('./counter/counter.module').then((m)=>m.CounterModule),
    canActivate:[AuthGuard]
  },
  {
    path:'posts',
    loadChildren:()=>import('./posts/post.module').then((m)=>m.PostModule),
    canActivate:[AuthGuard]
  },
  {
    path:'users',
    loadChildren:()=>import('./users/user.module').then((m)=>m.UserModule),
    canActivate:[AuthGuard]
  },
  {
    path:'roles',
    loadChildren:()=>import('./Roles/roles.module').then((m)=>m.RolesModule),
    canActivate:[AuthGuard]
  },
  {
    path:'modules',
    loadChildren:()=>import('./ModuleManagement/moduleMgt.module').then((m)=>m.ModuleManagementModule),
    canActivate:[AuthGuard]
  },
  {
    path:'posts/details/:id',
    component:SinglePostComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then((m)=>m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
