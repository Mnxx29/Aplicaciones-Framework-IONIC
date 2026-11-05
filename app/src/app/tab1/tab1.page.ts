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
  alertCircleOutline,
  heartOutline,
  bodyOutline,
  radioOutline,
  checkmarkCircleOutline,
  warningOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
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
export class Tab1Page {
  private toastCtrl = inject(ToastController);

  fallDetected = false;
  heartAnomaly = false;
  heartRate = 74;

  constructor() {
    addIcons({
      alertCircleOutline,
      heartOutline,
      bodyOutline,
      radioOutline,
      checkmarkCircleOutline,
      warningOutline,
    });
  }

  async triggerSOS() {
    const toast = await this.toastCtrl.create({
      message: 'Alerta SOS enviada a los cuidadores',
      duration: 2200,
      position: 'bottom',
      color: 'danger',
    });
    await toast.present();
  }

  async toggleFallSimulation() {
    this.fallDetected = !this.fallDetected;
    if (this.fallDetected) {
      const toast = await this.toastCtrl.create({
        message: 'Caída brusca detectada • Notificando cuidador',
        duration: 2200,
        position: 'bottom',
        color: 'danger',
      });
      await toast.present();
    }
  }

  async toggleHeartAnomaly() {
    this.heartAnomaly = !this.heartAnomaly;
    this.heartRate = this.heartAnomaly ? 118 : 74;
    if (this.heartAnomaly) {
      const toast = await this.toastCtrl.create({
        message: 'Anomalía cardíaca detectada en pulsera (118 BPM)',
        duration: 2200,
        position: 'bottom',
        color: 'warning',
      });
      await toast.present();
    }
  }
}
