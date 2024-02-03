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
import { ValidatorService } from '../../validator.service';
import { registerUser } from '../../state';

@Component({
  selector: 'app-register',
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
  providers: [ValidatorService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private customValidators: ValidatorService) {}
  passwordVisibility = true;
  confirmPasswordVisibility = true;

  registerForm = new FormGroup(
    {
      name: new FormControl('', []),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.customValidators.passwordMatch(
        'password',
        'confirmPassword'
      ),
    }
  );

  formData: any;

  // handing registeration form submission
  handleRegister() {
    this.formData = this.registerForm.value;
    const res = registerUser({
      name: this.formData.name,
      email: this.formData.email,
      password: this.formData.password,
    });
    if (res) alert('Account created.');
  }
}
