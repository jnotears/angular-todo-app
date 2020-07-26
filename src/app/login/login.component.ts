import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get form() {
        return this.loginForm.controls;
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        this.authService.login(this.form.username.value, this.form.password.value).subscribe(
            data => {
                this.router.navigate(['todo']);
            },
            error => {

            }
        )
    }
}