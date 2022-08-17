import Component from "../common/Component";

interface IUserData {
  email: string,
  password: string,
}

class Authorization extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'authorization');
    const title = new Component(this.node, 'h3', 'title', 'Authorization');
    const form = new Component(this.node, 'form', 'form');

    const inputEmail = document.createElement('input');
    inputEmail.className = 'input';
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('placeholder', 'email');

    const inputPassword = document.createElement('input');
    inputPassword.className = 'input';
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('placeholder', 'password');
    inputPassword.setAttribute('autocomplete', 'off');

    form.node.append(inputEmail, inputPassword);
    
    const buttonLogin = new Component(form.node, 'button', 'login', 'Log in');
    buttonLogin.node.setAttribute('type', 'submit');

    const buttonSignin = new Component(form.node, 'button', 'signin', 'Sign in');
    buttonSignin.node.setAttribute('type', 'submit');

    buttonLogin.node.onclick = (e: Event) => {
      e.preventDefault();
      const data = { email: inputEmail.value, password: inputPassword.value };

      if (!inputEmail.value || !inputPassword.value) {
        const message = new Component(form.node, 'span', 'message', 'Please enter your email and password.');
        setTimeout(() => message.destroy(), 5000);
      }

      if (inputPassword.value.length < 8) {
        const message = new Component(form.node, 'span', 'message', 'The password must contain at least 8 characters .');
        setTimeout(() => message.destroy(), 5000);
      }

      this.addOrGetUser(data, 'https://rss-lang-backends.herokuapp.com/users');
    };

    buttonSignin.node.onclick = (e: Event) => {
      e.preventDefault();
      const data = { email: inputEmail.value, password: inputPassword.value };
      this.addOrGetUser(data, 'https://rss-lang-backends.herokuapp.com/signin')
        .then((data) => {
        const resp = data.json();
        return resp;
      })
        .then((resp) => {
         window.localStorage.setItem('token', `${resp.token}`); // получаем токен, сохраняем в локал сторэйдж
        });
    };

  }

  async addOrGetUser(data: IUserData, url: string) {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return resp;
  };
}

export default Authorization;