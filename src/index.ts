import './css/style.css';
import './css/normalise.css';
import { createMainPage } from './components/main';
import { renderRegisterPage } from './components/views/register/registerPage'
import { renderEnterPage } from './components/views/enter/enterPage'
import { renderTextbookPage } from './components/views/textbook/textbookPage'

createMainPage();
renderRegisterPage()
renderEnterPage()
renderTextbookPage()