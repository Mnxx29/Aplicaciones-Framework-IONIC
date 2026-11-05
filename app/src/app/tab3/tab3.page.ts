import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonButton,
  IonBadge,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personCircleOutline,
  callOutline,
  shieldCheckmarkOutline,
  paperPlaneOutline,
  logOutOutline,
} from 'ionicons/icons';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonIcon,
    IonButton,
    IonBadge,
  ],
})
export class Tab3Page {
  private toastCtrl = inject(ToastController);
  private authService = inject(AuthService);

  caregivers = [
    {
      name: 'María Mendoza',
      role: 'Hija • Cuidadora Principal',
      phone: '+56 9 8421 1092',
      status: 'Alertas Activas',
    },
    {
      name: 'Dr. Roberto Gómez',
      role: 'Médico de Cabecera',
      phone: '+56 9 7310 4421',
      status: 'Emergencias',
    },
  ];

  constructor() {
    addIcons({
      personCircleOutline,
      callOutline,
      shieldCheckmarkOutline,
      paperPlaneOutline,
      logOutOutline,
    });
  }

  async notifyCaregivers() {
    const toast = await this.toastCtrl.create({
      message: 'Aviso de prueba enviado a María Mendoza y Dr. Gómez',
      duration: 2200,
      position: 'bottom',
      color: 'success',
    });
    await toast.present();
  }

  logout() {
    this.authService.logout();
  }
}
