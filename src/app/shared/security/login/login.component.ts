import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { SnackBarConstants } from '../../constants/snackbar.constants';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  error = '';

  userDetails = {
    username: null,
    password: null
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.accessTokenValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  login() {
    this.submitted = true;


    if (!this.loading) {
      this.loading = true;
      this.authenticationService.login(this.userDetails.username, this.userDetails.password)
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigate(['']);
            this.loading = false;
          },
          () => {
            this.snackBar.open('Неверная комбинация логин/пароль.', SnackBarConstants.CLOSE_ACTION, {
              duration: SnackBarConstants.SHORT_DURATION,
              panelClass: ['warn-text']
            });
            this.loading = false;
          });
    }
  }
}
