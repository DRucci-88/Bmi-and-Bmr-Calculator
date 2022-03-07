import { IonRow, IonCol, IonButton, IonIcon } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import React from "react";

interface Props {
  onCalculate: () => void;
  onReset: () => void;
  justNumber?: number;
}

const BmiControls: React.FC<Props> = ({
  onCalculate,
  onReset,
  justNumber = 10,
  children
}) => {
  return (
    <IonRow>
      <IonCol>
        <IonButton expand='block' onClick={onCalculate}>
          <IonIcon slot='start' icon={calculatorOutline} />
          Calculate {justNumber}
        </IonButton>
      </IonCol>
      <IonCol>
        <IonButton expand='block' onClick={onReset}>
          <IonIcon slot='start' icon={refreshOutline} />
          Reset
        </IonButton>
      </IonCol>
      {children}
    </IonRow>
    
  )
}

export default BmiControls;