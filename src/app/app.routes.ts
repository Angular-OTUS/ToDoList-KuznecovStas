import {Routes} from '@angular/router';
import {ROUTERS} from "./constants/routers";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent)
  },
  {
    path: ROUTERS.BACKLOG,
    loadComponent: () => import('./components/to-do-list/to-do-list.component').then(m => m.ToDoListComponent),
    loadChildren: () => import('./components/to-do-list/todo-list.routes').then(m => m.todoListRoutes)
  },
  {
    path: ROUTERS.BOARD,
    loadComponent: () => import('./components/board/board.component').then(m => m.BoardComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
