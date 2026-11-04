import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

/**
 * Credenciales de usuario requeridas:
 * Usuario: admin
 * Clave: 1234
 */
export const ADMIN_USER = 'admin';
export const ADMIN_PASS = '1234';

/**
 * Guard de autenticación para proteger rutas.
 * Valida si existe una sesión activa mantenida en el AuthService.
 * Si no está autenticado, redirige automáticamente al login.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redireccionar al login si no ha iniciado sesión
  return router.createUrlTree(['/login']);
};
