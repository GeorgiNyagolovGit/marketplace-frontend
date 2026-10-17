import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

@Injectable({ providedIn: 'root' })
export class ResetPasswordService {
  private readonly apiUrl = `${environment.apiUrl}/auth/reset-password`;

  constructor(private http: HttpClient) {}

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, request, {
      withCredentials: true
    });
  }
}
