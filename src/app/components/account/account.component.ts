import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { UserI, getUserById, updateUser } from '../../state';
import { CommonModule } from '@angular/common';
import { ValidatorService } from '../../validator.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [ValidatorService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  passwordVisibility = true;
  confirmPasswordVisibility = true;
  isEditable = false;
  userId: number;
  userData: UserI;

  updateUserDetailsForm: FormGroup;
  constructor(private customValidators: ValidatorService) {
    this.userId = parseInt(localStorage.getItem('userId')!);
    this.userData = getUserById(this.userId);
    this.fetchUserData(this.userId);
    this.updateUserDetailsForm = new FormGroup(
      {
        name: new FormControl(this.userData.name, []),
        email: new FormControl(this.userData.email, [
          Validators.email,
          Validators.required,
        ]),
        password: new FormControl(this.userData.password, [
          Validators.required,
        ]),
        confirmPassword: new FormControl(this.userData.password, [
          Validators.required,
        ]),
      },
      {
        validators: this.customValidators.passwordMatch(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  fetchUserData(userId: number) {
    this.userData = getUserById(userId);
  }

  enableEditing() {
    this.isEditable = true;
  }

  formData: any;

  updateUserDetails() {
    this.formData = this.updateUserDetailsForm.value;
    console.log(this.formData);
    const res = updateUser(this.userId, {
      name: this.formData.name,
      email: this.formData.email,
      password: this.formData.password,
    });
    alert('Profile updated.');
    this.fetchUserData(this.userId);
    this.isEditable = false;
  }
}
