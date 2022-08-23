export const renderAudiocallContent = (): string => `
<div class="wrapper">
<h2 class="heading">Аудиовызов</h2>
<div class="game">
  <div class="voice"></div>
  <div class="answer"></div>
  <ul class="words-to-guess">
    <li class="word-to-guess answer-true">подписать</li>
    <li class="word-to-guess answer-false">организовать</li>
    <li class="word-to-guess">фабрика</li>
    <li class="word-to-guess">период</li>
    <li class="word-to-guess">широкий</li>
  </ul>
  <button class="next-word">Пропустить</button>
</div>
</div>
`;