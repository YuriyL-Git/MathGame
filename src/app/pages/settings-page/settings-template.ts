const template = `
    <div class="settings__title-wrapper">
      <h2 class="settings__title">Settings</h2>
      <div class="settings__icon"></div>
    </div>
    <div class="field-size-option">
      <p class="field-size-option__title">field size</p>
    </div>
    <div class="category-option">
      <p class="category-option__title">images category</p>
    </div>
 
`;

export const settingsTemplate = (): DocumentFragment => {
  const element = document.createElement('template');
  element.innerHTML = template;
  return element.content;
};
