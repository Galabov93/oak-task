import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface Step {
  name: string;
  isDone: boolean;
}

interface Phase {
  stage: number;
  isDone: boolean;
  phaseName: string;
  steps: Step[];
}

const INITIAL_STARTUP_STEPS: Phase[] = [
  {
    stage: 1,
    isDone: false,
    phaseName: 'Foundation',
    steps: [
      { name: 'Install', isDone: false }, // we can have an id for each step, so we don't compare strings with multiple words
      { name: 'Configure', isDone: false },
      { name: 'Start', isDone: false },
    ],
  },
  {
    stage: 2,
    isDone: false,
    phaseName: 'Discovery',
    steps: [
      { name: 'Create Roadmap', isDone: false },
      { name: 'Competitor Analysis', isDone: false },
      { name: 'Start', isDone: false },
    ],
  },
  {
    stage: 3,
    isDone: false,
    phaseName: 'Delivery',
    steps: [
      { name: 'Release marketting website', isDone: false },
      { name: 'Release MVP', isDone: false },
    ],
  },
];

// We could have a separate structure for phase steps, so we optimize the performance
// const steps = new Map<number, Step[]>([
//   [
//     1,
//     [
//       { name: 'Install', isDone: false },
//       { name: 'Configure', isDone: false },
//       { name: 'Start', isDone: false },
//     ],
//   ],
// ]);

function MultiStepForm() {
  const [phases, setPhases] = useLocalStorage('startup-steps', INITIAL_STARTUP_STEPS);

  const toggleCheckbox = (stage: number, name: string) => {
    const newPhases = phases.map((phase) => {
      if (phase.stage !== stage) return phase;

      const checkboxToToggle = phase.steps.find((step) => step.name === name);

      if (checkboxToToggle !== undefined) {
        checkboxToToggle.isDone = !checkboxToToggle.isDone;
      }

      return phase;
    });

    setPhases(newPhases);
  };

  return (
    <div>
      {phases.map(({ stage, phaseName, steps }) => {
        return (
          <div key={phaseName}>
            <h1>{phaseName}</h1>
            <p>{stage}</p>

            {steps.map(({ name, isDone }) => {
              return (
                <Checkbox
                  key={name}
                  label={name}
                  checked={isDone}
                  onToggle={() => toggleCheckbox(stage, name)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default MultiStepForm;

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

function Checkbox({ label, checked, onToggle }: CheckboxProps): React.ReactElement {
  return (
    <div>
      <label>
        <input type="checkbox" checked={checked} onChange={onToggle} />
        {label}
      </label>
    </div>
  );
}
