import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private readonly apiUrl = 'http://localhost:8080/api/auth/forgot-password';

  constructor(private http: HttpClient) {}

  sendResetLink(email: string): Observable<void> {
    return this.http.post<void>(
      this.apiUrl,
      { email },
      { withCredentials: true }
    );
  }
}