import './HomePage.css';

import React from 'react';
import { useLocalStorage } from 'usehooks-ts';

import PhaseStep from './PhaseStep';

export interface Step {
  // id: string
  name: string;
  isDone: boolean;
}

export interface Phase {
  // id: string;
  stage: number;
  isDone: boolean;
  phaseName: string;
  steps: Step[];
}

const STORAGE_KEY_STARTUP_STEPS = 'startup-steps';

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

function Homepage() {
  // set initial phases or load from local storage
  const [phases, setPhases] = useLocalStorage(
    STORAGE_KEY_STARTUP_STEPS,
    INITIAL_STARTUP_STEPS,
  );

  return (
    <div className="homepage">
      <h1>Startup Progress</h1>
      <div className="container">
        {phases.map(({ stage, phaseName, steps }) => {
          return (
            <PhaseStep
              key={phaseName}
              phaseName={phaseName}
              stage={stage}
              steps={steps}
              phases={phases}
              setPhases={setPhases}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Homepage;
