import { useIonAlert, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonPage, IonButtons, IonBackButton } from "@ionic/react";
import React, { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import BmiControls from "../components/BmiControls";
import BmiResult from "../components/BmiResult";
import InputControl from "../components/InputControl";

type inputUnits = 'cmkg' | 'ftlbs';

const BmiForm = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>(0);
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const [calcUnits, setCalcUnit] = useState<inputUnits>('cmkg');
  const [alert] = useIonAlert();

  const calculateBMI = () => {
    console.log('Tinggi: ' + heightInputRef.current?.value);
    console.log('Berat : ' + weightInputRef.current?.value);
    const enteredHeight = heightInputRef.current?.value;
    const enteredWeight = weightInputRef.current?.value;

    if (!enteredHeight || !enteredWeight) {
      console.log('There is empty field');
      alert({ message: 'Fill the required field', buttons: ['Cancel', { text: 'Ok', handler: (e) => console.log(e) }] });
      return;
    }
    if (enteredHeight < 0 || enteredWeight < 0) {
      console.log('No minus input');
      alert({ message: 'No minus input', buttons: ['Cancel', { text: 'Ok' }] });
      return;
    }

    const bmi: number = +enteredWeight / ((+enteredHeight / 100) * (+enteredHeight / 100));
    setCalculatedBMI(bmi);
  }

  const selectCalcUnitHandler = (value: inputUnits) => {
    console.log(value);
    setCalcUnit(value);
    const enteredHeight = heightInputRef.current?.value;
    const enteredWeight = weightInputRef.current?.value;
    if (!enteredHeight || !enteredWeight) return;

    if (value === 'cmkg') {
      heightInputRef.current!.value = +enteredHeight / 0.0328;
      weightInputRef.current!.value = +enteredWeight / 2.2;
    }
    else if (value === 'ftlbs') {
      heightInputRef.current!.value = +enteredHeight * 0.0328;
      weightInputRef.current!.value = +enteredWeight * 2.2;
    }
  }

  const resetInput = () => {
    // if(heightInputRef && weightInputRef)
    heightInputRef.current!.value = '';
    weightInputRef.current!.value = '';
    setCalculatedBMI(0);
  }

  const criteriaBMI = (bmi: number): string => {
    if (bmi < 8.5) return "Thin"
    else if (bmi < 24.9) return "Normal"
    else if (bmi < 29.9) return "Fat"
    else return "Obesity"
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>
            BMI Calculator
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <InputControl valueSegment={calcUnits} onSegmentChange={selectCalcUnitHandler} />
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='floating'>Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'ft'})</IonLabel>
                <IonInput ref={heightInputRef} inputMode='numeric' type='number' />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position='floating'>Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                <IonInput ref={weightInputRef} inputMode='numeric' type='number' />
              </IonItem>
            </IonCol>
          </IonRow>

          <BmiControls onCalculate={calculateBMI} onReset={resetInput} justNumber={4}>
            <IonCol>
              <IonButton expand='block'>Test Props Children</IonButton>
            </IonCol>
          </BmiControls>


          <BmiResult calculatedBMI={calculatedBMI} resultBmi={criteriaBMI(calculatedBMI)} />

        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BmiForm;