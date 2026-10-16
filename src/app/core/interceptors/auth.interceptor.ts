import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const protectedPaths = ['/api/admin', '/api/cart', '/api/orders', '/api/payments'];
  const isProtectedRequest = protectedPaths.some(path => request.url.includes(path));
  const token = inject(AuthService).getToken();

  if (!token || !isProtectedRequest) {
    return next(request);
  }

  return next(request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }));
};
