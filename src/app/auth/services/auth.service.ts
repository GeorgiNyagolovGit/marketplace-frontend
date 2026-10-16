import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly storageKey = 'marketplace_user';
  private currentUser: AuthResponse | null = this.readStoredUser();

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request)
      .pipe(tap(user => this.setCurrentUser(user)));
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request)
      .pipe(tap(user => this.setCurrentUser(user)));
  }

  logout(): Observable<void> {
    return of(undefined).pipe(tap(() => this.clearUser()));
  }

  getUser(): AuthResponse | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getToken(): string | null {
    return this.currentUser?.token ?? null;
  }

  clearUser(): void {
    this.currentUser = null;

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }

  private setCurrentUser(user: AuthResponse): void {
    this.currentUser = user;

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  private readStoredUser(): AuthResponse | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    try {
      const storedUser = localStorage.getItem(this.storageKey);
      if (!storedUser) {
        return null;
      }

      const user: unknown = JSON.parse(storedUser);
      if (!this.isValidStoredUser(user)) {
        localStorage.removeItem(this.storageKey);
        return null;
      }

      return user;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }

  private isValidStoredUser(user: unknown): user is AuthResponse {
    if (typeof user !== 'object' || user === null) {
      return false;
    }

    const candidate = user as Partial<AuthResponse>;
    return typeof candidate.id === 'number' &&
      typeof candidate.email === 'string' &&
      typeof candidate.token === 'string' &&
      candidate.token.length > 0 &&
      Array.isArray(candidate.roles) &&
      candidate.roles.every(role => typeof role === 'string');
  }
}
