import { IonLabel, IonSegment, IonSegmentButton, SegmentChangeEventDetail } from "@ionic/react";
import React from "react";

// const InputControl: React.FC = () => {
//   return (
//     <></>
//   );
// };

type inputUnits = 'cmkg' | 'ftlbs';

interface Props {
  valueSegment: inputUnits;
  onSegmentChange: (value: inputUnits) => void;
}

const InputControl = ({ 
  valueSegment = 'cmkg', 
  onSegmentChange 
}: Props) => {

  const segmentChangeHandler = (e: CustomEvent<SegmentChangeEventDetail>) => {
    if (e.detail.value === 'cmkg' || e.detail.value === 'ftlbs') {
      onSegmentChange(e.detail.value);
    }
  }

  return (
    <IonSegment value={valueSegment} onIonChange={segmentChangeHandler}>
      <IonSegmentButton value="cmkg">
        <IonLabel>CM/KG</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value='ftlbs'>
        <IonLabel>FT/LBS</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  )
}

export default InputControl;
