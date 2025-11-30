import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // const authService = inject(AuthService);

  const skipUrls = ['/auth/login', '/auth/register'];

  const shouldSkip = skipUrls.some((url) => req.url.includes(url));

  if (shouldSkip) {
    return next(req);
  }
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
