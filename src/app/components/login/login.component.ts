import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import * as _ from 'lodash';
import { getUserByEmail } from '../../state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router) {}

  passwordVisibility = true;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  formData: any;
  
  // handling login form submission
  handleLogin() {
    this.formData = this.loginForm.value;
    const userdata = getUserByEmail(this.formData.email);
    console.log(userdata);
    if (
      userdata &&
      _.isEqual(this.formData, {
        email: userdata.email,
        password: userdata.password,
      })
    ) {
      localStorage.setItem('userId', userdata.id.toString());
      this.router.navigate(['/']);
      alert('welcome back.');
    } else {
      alert('Invalid Email/Password.');
    }
  }
}
