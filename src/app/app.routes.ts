import { Routes } from '@angular/router';
// Suppression des imports de composants standalone, ils seront chargés dynamiquement

export const routes: Routes = [
  {
    path: 'academic-levels',
    loadComponent: () =>
      import('./list-academic-level/list-academic-level.component').then(
        (m) => m.ListAcademicLevelComponent,
      ),
  },
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'introduction',
    loadComponent: () =>
      import('./introduction/introduction.component').then((m) => m.IntroductionComponent),
  },
  {
    path: 'projects/add',
    loadComponent: () =>
      import('./add-project/add-project.component').then((m) => m.AddProjectComponent),
  },
  {
    path: 'projects/:type',
    loadComponent: () =>
      import('./list-project/list-project.component').then((m) => m.ListProjectComponent),
  },
  {
    path: 'projects/update/:id',
    loadComponent: () =>
      import('./add-project/add-project.component').then((m) => m.AddProjectComponent),
  },
  {
    path: 'missions',
    loadComponent: () =>
      import('./list-mission/list-mission.component').then((m) => m.ListMissionComponent),
  },
  {
    path: 'missions/:id/details',
    loadComponent: () =>
      import('./detail-mission/detail-mission.component').then((m) => m.DetailMissionComponent),
  },
  {
    path: 'missions/add',
    loadComponent: () =>
      import('./add-mission/add-mission.component').then((m) => m.AddMissionComponent),
  },
];
