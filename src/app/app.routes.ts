import {Routes} from '@angular/router';
import {ToDoListComponent} from "./components/to-do-list/to-do-list.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {todoListRoutes} from "./components/to-do-list/todo-list.routes";
import {ROUTERS} from "./constants/routers";

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTERS.TASKS,
    pathMatch: 'full'
  },
  {
    path: ROUTERS.TASKS,
    component: ToDoListComponent,
    children: todoListRoutes // инклудим из другого файла
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
