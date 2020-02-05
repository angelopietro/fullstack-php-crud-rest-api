import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AddUrlComponent } from './components/urls/add/add.component';
import { EditUrlComponent } from './components/urls/edit/edit.component';
import { PreviewUrlComponent } from './components/urls/preview/preview.component';

import { AddUserComponent } from './components/users/add/add.component';
import { EditUserComponent } from './components/users/edit/edit.component';
import { ListUserComponent } from './components/users/list/list.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TemplateComponent } from './pages/template/template.component';
import { ListUrlComponent } from './components/urls/list/list.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : '', component : LoginComponent},

  { path: 'dashboard', component: TemplateComponent, canActivate: [AuthGuard],
    children: [{ path: '',  component: DashboardComponent}]},

  /*URL ROUTE*/
  { path: 'urls', component: TemplateComponent, canActivate: [AuthGuard],
  children: [{ path: '',  component: ListUrlComponent}]
  },

  { path: 'urls/new', component: TemplateComponent, canActivate: [AuthGuard],
  children: [{ path: '',  component: AddUrlComponent}]
  },

  { path: 'urls/edit/:id', component: TemplateComponent, canActivate: [AuthGuard],
  children: [{ path: '', component: EditUrlComponent }]
  },

  { path: 'urls/preview/:id', component: TemplateComponent, canActivate: [AuthGuard],
  children: [{ path: '', component: PreviewUrlComponent}]
  },

  /*USER ROUTE*/
  { path: 'users', component: TemplateComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: ListUserComponent }]
  },

  { path: 'users/new', component: TemplateComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: AddUserComponent }]
  },

  { path: 'users/edit/:id', component: TemplateComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: EditUserComponent }]
  },

  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
