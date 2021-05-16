export const formTemplate = `
  <form class="register">
    <h2 class="register__title">Register new Player</h2>

    <div class="register__input-section-wrapper">
      <div class="register__input-section">

        <div class="register__input-wrapper">
          <input class="register__input register__input--first-name" type="text" placeholder="First name"
                 id="first-name">
          <label class="register__input-label" for="first-name">Enter your first name:</label>
        </div>
        <div class="register__input-wrapper">
          <input class="register__input register__input-last-name" type="text" placeholder="Last name" id="last-name">
          <label class="register__input-label" for="last-name">Enter your last name:</label>
        </div>
        <div class="register__input-wrapper">
          <input class="register__input register__input-email" type="text" placeholder="E-mail" id="email">
          <label class="register__input-label" for="email">Enter your E-mail:</label>
        </div>
      </div>
    </div>

    <div class="register__avatar-wrapper">
      <div class="register__avatar"></div>
    </div>

    <div class="register__buttons">
      <button class="register__btn register__btn--add">add user</button>
      <button class="register__btn register__btn--cancel">cancel</button>
    </div>
  </form>
`;
