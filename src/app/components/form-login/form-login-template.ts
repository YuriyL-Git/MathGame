const template = `
  <form class="login">
    <h2 class="login__title">Login</h2>
          <input class="login__input login__input-email" data-type="email"
          type="email" placeholder="E-mail"
          maxlength="30" autocomplete="off">
          <input class="login__input login__input-password" data-type="password"
          type="password" placeholder="Password"
          maxlength="30" autocomplete="off">
 
   <p class="login__validation-message"></p>

    <div class="login__buttons-wrapper">
      <button class="login__btn login__btn--add" type="submit">OK</button>
      <button class="login__btn login__btn--cancel" type="reset">cancel</button>
    </div>
  </form>
`;

export const formSignInTemplate = (): DocumentFragment => {
  const element = document.createElement('template');
  element.innerHTML = template;
  return element.content;
};
