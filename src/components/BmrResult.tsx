import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonItem, IonLabel, IonRow } from "@ionic/react";
import React from "react";

interface Props {
  calculatedBmr: number
}

const BmrResult = ({
  calculatedBmr = 0
}: Props) => {
  if (calculatedBmr === 0) return null;
  else return (
    <IonCard>
      <IonCardHeader className="ion-text-center">
        <IonCardTitle>BMR = {calculatedBmr}</IonCardTitle>
        <IonCardSubtitle>Daily calorie needs based on activity level</IonCardSubtitle>
      </IonCardHeader>

      <IonItem className="ion-text-bold">
        <IonLabel>Activity Level</IonLabel>
        <IonLabel slot="end">Calorie</IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>Sedentary: little or no exercise</IonLabel>
        <IonLabel slot="end">{calculatedBmr * 1.2}</IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>Exercise 1-3 times/week</IonLabel>
        <IonLabel slot="end">{calculatedBmr * 1.375}</IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>Exercise 4-5 times/week</IonLabel>
        <IonLabel slot="end">{calculatedBmr * 1.55}</IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>Daily exercise or intense exercise 3-4 </IonLabel>
        <IonLabel slot="end">{calculatedBmr * 1.725}</IonLabel>
      </IonItem>
      
      <IonItem>
        <IonLabel>Intense exercise 6-7 times/week</IonLabel>
        <IonLabel slot="end">{calculatedBmr * 1.9}</IonLabel>
      </IonItem>

    </IonCard>
  );
};

export default BmrResult;