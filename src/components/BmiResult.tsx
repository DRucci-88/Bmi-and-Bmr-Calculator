import { IonCard, IonCardTitle, IonCardContent } from "@ionic/react";
import React from "react";

interface Props {
  calculatedBMI: number,
  resultBmi: string
}

const BmiResult = ({
  calculatedBMI = 0,
  resultBmi
}: Props) => {
  if (calculatedBMI === 0)
    return (null);

  else
    return (
      <>
        <IonCard className='ion-text-center'>
          <IonCardTitle className='ion-padding'>
            {resultBmi}
          </IonCardTitle>
          <IonCardContent>
            {calculatedBMI}
          </IonCardContent>
        </IonCard>
      </>
    );
};

export default BmiResult;