const template = `
  <form class="register">
    <h2 class="register__title">Register new Player</h2>

    <div class="register__input-section-wrapper">
      <div class="register__input-section">
        <div class="register__input-wrapper">
          <input class="register__input register__input--first-name" data-type="name" type="text"
           placeholder="First name" id="first-name" maxlength="30" required autocomplete="off">
        </div>
        <div class="register__input-wrapper">
          <input class="register__input register__input-last-name" data-type="name"
           type="text" placeholder="Last name" id="last-name" maxlength="30" required autocomplete="off">
        </div>
        <div class="register__input-wrapper">
          <input class="register__input register__input-email" data-type="email"
          type="email" placeholder="E-mail" id="email"
          maxlength="30" required autocomplete="off">
        </div>
        <div class="register__input-wrapper">
          <input class="register__input register__input-password" data-type="password"
          type="password" placeholder="Password" id="password"
          maxlength="30" required autocomplete="off">
        </div>
      </div>
    </div>

    <div class="register__avatar-wrapper">
      <canvas class="register__avatar"></canvas>
      <p class="register__tooltip">change the avatar</p>
    </div>

    <div class="register__buttons">
      <button class="register__btn register__btn--add" type="submit">add user</button>
      <button class="register__btn register__btn--cancel" type="reset">cancel</button>
    </div>
  </form>
`;

export const formTemplate = (): DocumentFragment => {
  const element = document.createElement('template');
  element.innerHTML = template;
  return element.content;
};
