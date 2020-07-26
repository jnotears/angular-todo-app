import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service'
enum Status {
    done = 'done',
    new = 'new',
}

@Component({
    templateUrl: 'todo.component.html'
})
export class TodoComponent implements OnInit {
    todo: Todo[] = [];
    status = Status;

    constructor(
        private todoService: TodoService
    ) { }

    ngOnInit() {
        this.getAllByUid();
    }

    getAllByUid() {
        this.todoService.getAllByUid().subscribe(
            todo => {
                this.todo = todo;
            }
        )
    }

    tongleStatus(e, item){
        if(e.target.checked){
            item.status = this.status.done;
        }else{
            item.status = this.status.new;
        }
        this.todoService.update(item).subscribe();
    }
}