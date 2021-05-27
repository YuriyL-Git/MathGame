const template = `
  <div class="header__logo">
    <a href="#" class="header__logo-link">
      <img src="./icons/game-logo.png" alt="game logo" class="header__logo-image">
      <p class="header__logo-title">Match-Match Game</p>
    </a>
  </div>
  <nav class="header__nav">
    <ul class="header__nav-list">
      <li class="header__nav-item header__item-selected item-help">
        <a class="header__nav-link" href="#about">
          <img class="header__nav-icon" src="./icons/help.svg" alt="help">
          <p class="header__link-title">About</p>
        </a>
      </li>
      <li class="header__nav-item item-score">
        <a class="header__nav-link" href="#bestscore">
          <img class="header__nav-icon" src="./icons/score.svg" alt="help">
          <p class="header__link-title">Best Score</p>
        </a>
      </li>
      <li class="header__nav-item item-settings">
        <a class="header__nav-link" href="#settings">
          <img class="header__nav-icon" src="./icons/settings.svg" alt="help">
          <p class="header__link-title">Settings</p>
        </a>
      </li>
      <li class="header__nav-item item-game">
        <a class="header__nav-link" href="#game">
          <img class="header__nav-icon" src="./icons/game.svg" alt="help">
          <p class="header__link-title">Game</p>
        </a>
      </li>
    </ul>
  </nav>
`;

export const headerTemplate = (): DocumentFragment => {
  const element = document.createElement('template');
  element.innerHTML = template;
  return element.content;
};
