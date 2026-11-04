import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  logInOutline,
  alertCircleOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
} from 'ionicons/icons';
import { AuthService } from '../services/auth';
import { ADMIN_USER, ADMIN_PASS } from '../guards/auth-guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonSpinner,
  ],
})
export class LoginPage implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);

  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  readonly defaultUser = ADMIN_USER;
  readonly defaultPass = ADMIN_PASS;

  constructor() {
    addIcons({
      personOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      logInOutline,
      alertCircleOutline,
      shieldCheckmarkOutline,
      sparklesOutline,
    });
  }

  ngOnInit() {
    // Si ya existe sesión activa en el sistema, redirige directo a las tabs
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tabs/tab1']);
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  fillDemoCredentials() {
    this.username = this.defaultUser;
    this.password = this.defaultPass;
    this.errorMessage = '';
  }

  async onLogin() {
    this.errorMessage = '';

    const user = this.username.trim();
    const pass = this.password.trim();

    if (!user || !pass) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    this.isLoading = true;

    // Pequeño delay de 300ms para feedback visual fluido
    setTimeout(async () => {
      const success = this.authService.login(user, pass);
      this.isLoading = false;

      if (success) {
        const toast = await this.toastCtrl.create({
          message: `¡Bienvenido, ${user}! Sesión iniciada con éxito.`,
          duration: 2000,
          position: 'bottom',
          color: 'success',
        });
        await toast.present();

        this.router.navigate(['/tabs/tab1']);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos. Revisa las credenciales.';
        const toast = await this.toastCtrl.create({
          message: 'Error: Credenciales incorrectas',
          duration: 2500,
          position: 'bottom',
          color: 'danger',
        });
        await toast.present();
      }
    }, 300);
  }
}
