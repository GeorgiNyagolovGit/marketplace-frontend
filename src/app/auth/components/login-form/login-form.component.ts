import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../models/login-request.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Output() submitForm = new EventEmitter<LoginRequest>();

  email = '';
  password = '';

  onSubmit(): void {
    this.submitForm.emit({
      email: this.email,
      password: this.password
    });
  }
}