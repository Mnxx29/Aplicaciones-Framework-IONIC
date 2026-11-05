import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
  IonButton,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  pulseOutline,
  notificationsOutline,
  peopleOutline,
  logOutOutline,
  heartCircleOutline,
} from 'ionicons/icons';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonMenuToggle,
    IonButton,
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);

  constructor() {
    addIcons({
      pulseOutline,
      notificationsOutline,
      peopleOutline,
      logOutOutline,
      heartCircleOutline,
    });
  }

  goToTab(path: string) {
    this.router.navigate([path]);
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar Sesión',
      message: '¿Salir del panel de monitoreo Aura?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          role: 'destructive',
          handler: async () => {
            this.authService.logout();
            const toast = await this.toastCtrl.create({
              message: 'Sesión cerrada',
              duration: 1800,
              position: 'bottom',
              color: 'dark',
            });
            await toast.present();
          },
        },
      ],
    });

    await alert.present();
  }
}
