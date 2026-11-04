import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_USER, ADMIN_PASS } from '../guards/auth-guard';

export interface UserSession {
  username: string;
  loginTime: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  // Clave para mantener la sesión en almacenamiento local (localStorage)
  private readonly SESSION_KEY = 'auth_user_session';

  // Credenciales sincronizadas con el Guard (admin y 1234)
  readonly validUsername = ADMIN_USER;
  readonly validPassword = ADMIN_PASS;

  /**
   * Intenta iniciar sesión con el usuario y la clave proporcionados.
   * Si son correctos (admin / 1234), guarda la sesión en localStorage para mantenerla iniciada.
   */
  login(user: string, pass: string): boolean {
    const cleanUser = user ? user.trim() : '';
    const cleanPass = pass ? pass.trim() : '';

    if (cleanUser === this.validUsername && cleanPass === this.validPassword) {
      const sessionData: UserSession = {
        username: cleanUser,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
      return true;
    }
    return false;
  }

  /**
   * Cierra la sesión activa, elimina los datos almacenados y redirige al login.
   */
  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    this.router.navigate(['/login']);
  }

  /**
   * Verifica si existe una sesión activa y válida en localStorage.
   */
  isAuthenticated(): boolean {
    const session = localStorage.getItem(this.SESSION_KEY);
    if (!session) {
      return false;
    }
    try {
      const parsed: UserSession = JSON.parse(session);
      return parsed && parsed.username === this.validUsername;
    } catch {
      return false;
    }
  }

  /**
   * Obtiene los datos de la sesión actual si existe.
   */
  getCurrentSession(): UserSession | null {
    const session = localStorage.getItem(this.SESSION_KEY);
    if (!session) {
      return null;
    }
    try {
      return JSON.parse(session) as UserSession;
    } catch {
      return null;
    }
  }
}

// Alias de retrocompatibilidad con la definición previa
export const Auth = AuthService;
