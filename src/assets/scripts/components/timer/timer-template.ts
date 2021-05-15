export const timerTemplate = (minutes: string, seconds: string) => `
    <div class="section-minutes">
      <span class="minutes countdown-time">${minutes}</span>
    </div>
    <div>:</div>
    <div class="section-seconds">
      <span class="seconds countdown-time">${seconds}</span>
    </div>
`;
