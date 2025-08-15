import { Routes } from '@angular/router';
import { ListProjectComponent } from './list-project/list-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';

export const routes: Routes = [
  { path: '', component: ListProjectComponent },
  { path: 'create', component: CreateProjectComponent },
  { path: 'create/:id', component: CreateProjectComponent },
];
