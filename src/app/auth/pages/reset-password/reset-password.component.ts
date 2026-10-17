import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  token = '';
  email = '';
  password = '';
  confirmPassword = '';
  message = '';
  errorMessage = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
  }

  submit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.message = '';

    this.http.post(
      `${environment.apiUrl}/auth/reset-password`,
      {
        token: this.token,
        email: this.email,
        password: this.password
      },
      { withCredentials: true }
    ).subscribe({
      next: () => {
        this.message = 'Password reset successfully.';
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.errorMessage = 'Could not reset password. Check your reset link.';
        this.loading = false;
      }
    });
  }
}
