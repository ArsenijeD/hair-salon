import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SessionManagementService } from 'src/app/core/services/session-management.service';
import { LoginResponse } from 'src/app/model/loginResponse';
import { User } from 'src/app/model/user';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authenticationService: AuthenticationService, 
              private notificationService: NotificationService,
              private userService: UserService,
              private session: SessionManagementService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit(): void {
    this.authenticationService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe({
      next: (response: LoginResponse) => { 
        this.session.save('token', response.jwt);
        this.userService.getUserByUsername(this.loginForm.controls['username'].value).subscribe({
          next: (user: User) => { this.session.save('current-user', user) },
          error: () => { 
            //TODO Decide how to handle this 
          }
        });
      },
      error: (status: number) => { 
        this.notificationService.showErrorMessage(status, 'Neuspešna prijava', 'Pogrešno korisničko ime ili šifra.')
      }
    });
  }
}
