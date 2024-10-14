import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {TodoStoreService} from "../../../services/todo-store.service";
import {TodoTask} from '../../../interfaces/to-do';
import {tap} from 'rxjs';
import {JsonPipe, NgIf} from "@angular/common";
import {ButtonComponent} from "../../button/button.component";
import {Button} from "../../../interfaces/button";

@Component({
  selector: 'app-to-do-item-view',
  standalone: true,
  imports: [
    JsonPipe,
    ButtonComponent,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './to-do-item-view.component.html',
  styleUrl: './to-do-item-view.component.scss'
})
export class ToDoItemViewComponent implements OnInit {
  todo: TodoTask | undefined;
  goBackButton: Button
  editTodoButton: Button


  constructor(
    private route: ActivatedRoute,
    private store: TodoStoreService,
    private router: Router
  ) {
    this.goBackButton = {
      icon: "BUTTONS.GO_BACK",
      title: "BUTTONS.GO_BACK_TITLE",
      class: {
        color: "white",
        background: "red",
      }
    }
    this.editTodoButton = {
      icon: "BUTTONS.EDIT",
      title: "BUTTONS.EDIT_TITLE",
      class: {
        color: "white",
        background: "green",
      }
    }
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.store.getTaskByID(id).pipe(
        tap(data => {
            this.todo = data;
          }
        )).subscribe();
    });
  }

  goBack() {
    this.router.navigate(['/tasks']);
    //this.location.back() // не корректное поведение при нажатие нескольких todo в списке
  }


  editTodo() {
    this.router.navigate(['edit'], {relativeTo: this.route, state: {todo: this.todo}})
  }

  isTaskEdit() {
    //console.log(this.route.snapshot.firstChild)
    return this.route.snapshot.firstChild !== null; // если есть дочерний роутер, значит выбрана задача
  }
}
