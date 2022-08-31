import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Phase, Step } from '.';
import Checkbox from './Checkbox';

interface PhaseStepProps {
  phaseName: string;
  stage: number;
  steps: Step[];
  phases: Phase[];
  setPhases: (phases: Phase[]) => void; // eslint-disable-line
}

const STORAGE_KEY_CURRENT_STEP = 'current-step'; // move to constants.ts

const getCurrentStep = (phases: Phase[]): number => {
  // move to api/utils.ts
  const currentPhase = phases.find((phase) => !phase.isDone);

  if (currentPhase) {
    return currentPhase.stage;
  }
  return 0;
};

function PhaseStep({ phaseName, stage, steps, phases, setPhases }: PhaseStepProps) {
  const [currentStep, setFormStep] = useLocalStorage(
    STORAGE_KEY_CURRENT_STEP,
    getCurrentStep(phases),
  );
  const lastStage = phases.length;

  const onToggleTask = (name: string) => {
    const newPhases = phases.map((phase) => {
      if (phase.stage !== stage) return phase;

      const checkboxToToggle = steps.find((step) => step.name === name);

      if (checkboxToToggle !== undefined) {
        checkboxToToggle.isDone = !checkboxToToggle.isDone;
      }

      return phase;
    });

    setPhases(newPhases);
  };

  if (currentStep !== stage) {
    return null;
  }

  return (
    <div>
      <h2>{phaseName}</h2>
      <p>
        Step {stage} of {lastStage}
      </p>

      {steps.map(({ name, isDone }) => {
        return (
          <Checkbox
            key={name}
            label={name}
            checked={isDone}
            onToggle={() => onToggleTask(name)}
          />
        );
      })}
      <PhaseButtons
        stage={stage}
        steps={steps}
        lastStage={lastStage}
        setFormStep={setFormStep}
      />
    </div>
  );
}

export default PhaseStep;

interface PhaseButtonsProps {
  stage: number;
  lastStage: number;
  steps: Step[];
  setFormStep: (value: React.SetStateAction<number>) => void; //eslint-disable-line
}

function PhaseButtons({
  stage,
  lastStage,
  steps,
  setFormStep,
}: PhaseButtonsProps): React.ReactElement {
  const nextFormStep = () => setFormStep((step) => step + 1);
  const prevFormStep = () => setFormStep((step) => step - 1);
  const onComplete = () => {
    console.log('Complete');
  };

  return (
    <>
      {stage !== 1 && <button onClick={prevFormStep}>Prev</button>}
      {stage !== lastStage && (
        <button onClick={nextFormStep} disabled={steps.some(({ isDone }) => !isDone)}>
          Next
        </button>
      )}
      {stage === lastStage && (
        <button onClick={onComplete} disabled={steps.some(({ isDone }) => !isDone)}>
          Complete
        </button>
      )}
    </>
  );
}
