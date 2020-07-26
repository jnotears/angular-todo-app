import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: number;

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    if(this.authService.currentUid){
      this.currentUser = this.authService.currentUid;
      this.router.navigate(['todo']);
    }
  }
}
