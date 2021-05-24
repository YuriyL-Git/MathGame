import { Component } from '../shared/component';
import { User } from '../../models/user';
import './_top-player.scss';

export class TopPlayer extends Component {
  private position: Component;

  private score: Component;

  constructor(user: User, positionNumber: number) {
    super('div', ['player__wrapper']);

    this.position = new Component('div', ['player__position']);
    this.position.element.innerText = `${positionNumber}`;

    const avatar = document.createElement('img');
    avatar.classList.add('player__avatar');
    avatar.src = './icons/avatar.png';
    if (user.avatar !== 'none') avatar.src = user.avatar;

    const name = new Component('div', ['player__name']);
    name.element.innerText = `${user.firstName} ${user.lastName}`;

    const email = new Component('div', ['player__email']);
    email.element.innerText = `${user.email}`;

    this.score = new Component('div', ['player__score']);
    const scoreValue = new Component('span', ['player__score-value']);
    scoreValue.element.innerText = `${user.score}`;
    this.score.element.innerText = 'Score: ';
    this.score.element.append(scoreValue.element);

    this.element.append(
      this.position.element,
      avatar,
      name.element,
      email.element,
      this.score.element,
    );
  }

  hideScoreAndPosition(): void {
    this.position.hide();
    this.score.hide();
  }
}
