import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonListHeader, IonMenuButton, IonPage, IonRadio, IonRadioGroup, IonRow, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import React, { useRef, useState } from "react";
import BmiControls from "../components/BmiControls";
import BmrResult from "../components/BmrResult";
import InputControl from "../components/InputControl";

type inputUnits = 'cmkg' | 'ftlbs';
type inputAges = 'male' | 'female';

const Bmr = () => {

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const ageInputRef = useRef<HTMLIonInputElement>(null);
  const genderInputRef = useRef<HTMLIonRadioGroupElement>(null);
  const [calcUnits, setCalcUnit] = useState<inputUnits>('cmkg');
  const [calculatedBmr, setCalculatedBmr] = useState<number>(0);
  const [alert] = useIonAlert();

  const calculateBMR = () => {
    const enteredHeight = heightInputRef.current?.value;
    const enteredWeight = weightInputRef.current?.value;
    const enteredAge = ageInputRef.current?.value;
    const enteredGender = genderInputRef.current?.value;
    if(!enteredWeight || !enteredHeight || !enteredGender || !enteredAge){
      alert({message: 'Fill the required field ', buttons:['Ok']}); return;
    }
    if(enteredHeight < 0 || enteredWeight < 0 || enteredAge < 0){
      alert({message:'No minus input', buttons:['Ok']}); return;
    }
    let bmr: number = 0;
    if(enteredGender === 'male')
      bmr = 66 + (13.7 * +enteredWeight) + ( 5 * +enteredHeight) - (6.8 * +enteredAge);
    else
      bmr = 65 + (9.6 * +enteredWeight) + ( 1.8 * +enteredHeight) - (4.7 * +enteredAge);
    setCalculatedBmr(+bmr.toFixed(2));
    console.log(bmr);

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
    heightInputRef.current!.value = '';
    weightInputRef.current!.value = '';
    ageInputRef.current!.value = '';
    genderInputRef.current!.value = '';
    setCalculatedBmr(0);
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonTitle>BMR Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>

          <InputControl valueSegment={calcUnits} onSegmentChange={selectCalcUnitHandler} />

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Age</IonLabel>
                <IonInput ref={ageInputRef} type="number" inputMode="numeric" />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'ft'})</IonLabel>
                <IonInput ref={heightInputRef} type="number" inputMode="numeric" />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                <IonInput ref={weightInputRef} type="number" inputMode="numeric" />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRadioGroup allowEmptySelection ref={genderInputRef}>
            <IonListHeader>
              <IonLabel>Gender</IonLabel>
            </IonListHeader>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Male</IonLabel>
                  <IonRadio slot="start" value={'male'} />
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel>Female</IonLabel>
                  <IonRadio slot="start" value={'female'} />
                </IonItem>
              </IonCol>
            </IonRow>

          </IonRadioGroup>

          <BmiControls onCalculate={calculateBMR} onReset={resetInput} />

          <BmrResult calculatedBmr={calculatedBmr} />

        </IonGrid>
      </IonContent>

    </IonPage>
  );
};

export default Bmr;