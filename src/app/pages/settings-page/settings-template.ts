const template = `
    <div class="settings__title-wrapper">
      <h2 class="settings__title">settings</h2>
      <div class="settings__icon"></div>
    </div>
    <div class="settings__field-size">

    </div>
`;

export const settingsTemplate = (): DocumentFragment => {
  const element = document.createElement('template');
  element.innerHTML = template;
  return element.content;
};
