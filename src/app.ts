import './assets/SCSS/style.scss';
import ProjectInput from './assets/scripts/projectInput';
import ProjectList from './assets/scripts/projectList';


const projectInput: ProjectInput = new ProjectInput();
const activeProjectList: ProjectList = new ProjectList('active');
const finishedProjectList: ProjectList = new ProjectList('finished');

