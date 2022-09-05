import '../node_modules/normalize.css';
import './styles/statistics.css';
import './styles/authorization.css';
import './styles/textbook.css';
import './styles/audiocall.css';
import './styles/style.css';
import './styles/mainpage.css'
import Controller from './app/controller';

const controller = new Controller(document.body);
controller.initRouter();
