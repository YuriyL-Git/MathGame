import { Component } from '../shared/component';
import { User } from '../../models/user';
import './_top-player.scss';

export class TopPlayer extends Component {
  constructor(user: User, positionNumber: number) {
    super('div', ['player__wrapper']);

    const position = new Component('div', ['player__position']);
    position.element.innerText = `${positionNumber}`;

    const avatar = document.createElement('img');
    avatar.classList.add('player__avatar');
    avatar.src = './icons/avatar.png';
    if (user.avatar !== 'none') avatar.src = user.avatar;

    const name = new Component('div', ['player__name']);
    name.element.innerText = `${user.firstName} ${user.lastName}`;

    const email = new Component('div', ['player__email']);
    email.element.innerText = `${user.email}`;

    const score = new Component('div', ['player__score']);
    const scoreValue = new Component('span', ['player__score-value']);
    scoreValue.element.innerText = `${user.score}`;
    score.element.innerText = 'Score: ';
    score.element.append(scoreValue.element);

    this.element.append(
      position.element,
      avatar,
      name.element,
      email.element,
      score.element,
    );
  }
}
