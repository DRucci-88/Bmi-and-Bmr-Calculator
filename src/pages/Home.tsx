import { IonButton, IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Home = () => {
  return(
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid className="ion-padding">
          <h1>Remacth Brother</h1>
          <IonButton routerLink="/bmi" expand="block">BMI Calculator</IonButton>
          <IonButton routerLink="/bmr" expand="block">BMR  Calculator</IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;