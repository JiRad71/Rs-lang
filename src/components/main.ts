import { renderMainContent } from './views/main/mainContent'

export const createMainPage = (): void => {
  document.body.innerHTML = `
  <header class="header">
    <div class="wrapper">
      <p class="logo">
        RSLang
      </p>
      <nav class="navigation">
        <ul class="navigation_menu">
          <li class="menu_item"><a href="#" class="menu_link textbook">Учебник</a></li>
          <li class="menu_item"><a href="#" class="menu_link audiocall">Аудиовызов</a></li>
          <li class="menu_item"><a href="#" class="menu_link sprint">Спринт</a></li>
          <li class="menu_item"><a href="#" class="menu_link stst">Статистика</a></li>
        </ul>
      </nav>
      <div class="auth">
        <span class="enter">вход</span>
        <span>|</span>
        <span class="register">регистрация</span>
      </div>
    </div>
  </header>
  <main id="main" class="main">
${renderMainContent()}
</main>
<footer class="footer">
  <div class="wrapper">
    <div class="left">
      <span class="left_footer_span">©</span><span class="left_footer_span">2022</span>
    </div>
    <div class="right">
      <a href="https://rs.school/index.html" class="right_link"></a>
    </div>
  </div>
</footer>`;
};
