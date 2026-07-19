import { SRSState } from "../types";

/**
 * SuperMemo-2 (SM-2) Algorithm for Spaced Repetition
 * @param grade Recall quality (0 to 5):
 *   0: Complete blackout
 *   1: Incorrect response, but familiar upon seeing the answer
 *   2: Incorrect response, but easy to recall upon seeing the answer
 *   3: Correct response, with serious difficulty
 *   4: Correct response, with minor hesitation
 *   5: Perfect response
 * @param state Previous SRSState
 * @returns Updated SRSState
 */
export function calculateSM2(grade: number, state: SRSState): SRSState {
  let easiness = state.easiness;
  let interval = state.interval;
  let repetition = state.repetition;

  if (grade >= 3) {
    // Correct response
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easiness);
    }
    repetition++;
  } else {
    // Incorrect response
    repetition = 0;
    interval = 1;
  }

  // Adjust easiness factor (EF)
  easiness = easiness + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easiness < 1.3) {
    easiness = 1.3; // Minimum easiness factor is 1.3
  }

  // Calculate new due date
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + interval);

  return {
    vocabId: state.vocabId,
    easiness,
    interval,
    repetition,
    dueDate: dueDate.toISOString(),
    lastReviewed: new Date().toISOString()
  };
}

/**
 * Initializes a new SRS state for a vocabulary word
 */
export function initializeSRSState(vocabId: string): SRSState {
  return {
    vocabId,
    easiness: 2.5,
    interval: 0, // due immediately
    repetition: 0,
    dueDate: new Date().toISOString()
  };
}
