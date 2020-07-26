import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';
import { AuthService } from '../../services/auth.service';
enum Status {
    new = 'new',
    done = 'done',
}

@Component({
    selector: 'add-new-todo',
    templateUrl: 'add-new-todo.component.html'
})
export class AddNewTodoComponent implements OnInit {
    @Output() newItemEvent = new EventEmitter<Todo>();
    addNewTodoForm: FormGroup;
    statuses = Status;
    keys = Object.keys;

    constructor(
        private todoService: TodoService,
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.addNewTodoForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            status: []
        });
    }

    get form() {
        return this.addNewTodoForm.controls;
    }

    onSubmit() {
        console.log(this.addNewTodoForm.value)
        if (this.addNewTodoForm.invalid) {
            return;
        }
        const todo = new Todo();
        todo.title = this.form.title.value;
        todo.description = this.form.description.value;
        todo.status = this.form.status.value;
        todo.userId = this.authService.currentUid;
        this.todoService.create(todo).subscribe(
            data => {
                this.newItemEvent.emit(todo);
            }
        );
    }
}