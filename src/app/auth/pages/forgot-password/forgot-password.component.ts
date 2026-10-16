import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  errorMessage = '';
  loading = false;

  constructor(private forgotPasswordService: ForgotPasswordService) {}

  onSubmit(): void {
    this.loading = true;
    this.message = '';
    this.errorMessage = '';

    this.forgotPasswordService.sendResetLink(this.email).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'If the email exists, reset instructions will be sent.';
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to process the request. Please try again.';
      }
    });
  }
}