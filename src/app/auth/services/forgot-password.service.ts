import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {
  private readonly apiUrl = `${environment.apiUrl}/auth/forgot-password`;

  constructor(private http: HttpClient) {}

  sendResetLink(email: string): Observable<void> {
    return this.http.post<void>(this.apiUrl, { email }, {
      withCredentials: true
    });
  }
}
