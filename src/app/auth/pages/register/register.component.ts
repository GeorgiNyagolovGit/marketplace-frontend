import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/register-request.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterFormComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(request: RegisterRequest): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.register(request).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/products']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.errorMessage = this.getErrorMessage(error);
      }
    });
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Cannot connect to the server. Make sure the backend is running.';
    }

    if (error.status === 409 || error.error?.message?.toLowerCase().includes('already')) {
      return 'An account with this email already exists.';
    }

    return error.error?.message || 'Registration failed. Please check your details.';
  }
}
