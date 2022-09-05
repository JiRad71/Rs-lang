import Component from "../../../common/Component";
import { IUserData, URL } from '../../../asset/utils/types';

class Auth {
  parent: HTMLElement;
  onSignin: (data: IUserData) => void;
  onLogin: (data: IUserData) => void;
  inputsData: IUserData;
  title: Component<HTMLElement>;

  render(parentNode: HTMLElement) {
    const auth = new Component(parentNode, 'div', 'authorization');
    const form = new Component(auth.node, 'form', 'form');
    this.title = new Component(form.node, 'h3', 'title', 'Bведите адрес электронной почты и пароль');
    const inputEmail = document.createElement('input');
    inputEmail.className = 'input';
    inputEmail.setAttribute('type', 'email');
    inputEmail.setAttribute('placeholder', 'Email');

    const inputPassword = document.createElement('input');
    inputPassword.className = 'input';
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('placeholder', 'Password');
    inputPassword.setAttribute('autocomplete', 'off');

    form.node.append(inputEmail, inputPassword);

    inputEmail.oninput = () => {
      this.inputsData.email = inputEmail.value;
    }

    inputPassword.oninput = () => {
      this.inputsData.password = inputPassword.value;
    }
    
    const buttonLogin = new Component(form.node, 'button', 'login', 'Регистрация');
    buttonLogin.node.setAttribute('type', 'button');

    const buttonSignin = new Component(form.node, 'button', 'signin', 'Войти');
    buttonSignin.node.setAttribute('type', 'button');

    this.inputsData = { email: inputEmail.value, password: inputPassword.value };

    buttonLogin.node.onclick = () => {
      if (!this.inputsData.email || !this.inputsData.password) {
        const message = new Component(form.node, 'span', 'message', 'Пожалуйста введите ваш email и пароль');
        setTimeout(() => message.destroy(), 5000);
      }

      if (this.inputsData.password.length < 8) {
        const message = new Component(form.node, 'span', 'message', 'Пароль должен содержать минимум 8 символов');
        setTimeout(() => message.destroy(), 5000);
      }
      this.onLogin(this.inputsData);
      this.title.node.textContent = `Ваша учетная запись создана, теперь можете войти`;
      buttonLogin.destroy();
    };

    buttonSignin.node.onclick = () => {
      this.onSignin(this.inputsData);
    };

    return auth.node;
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
  }

  checkUser(authBtn: Component<HTMLElement>, authUser: Component<HTMLElement>, userMenu:  Component<HTMLElement>, statBtn?: Component<HTMLElement>) {
    if (window.localStorage.getItem('token')) {
      const resp = fetch(`${URL.shortUrl}${URL.login}/${window.localStorage.getItem('usersId')}`, {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      resp.then((data) => data.json())
        .then((data) => data)
        .then((data) => {
          authBtn.node.classList.add('hidden');
          if (location.hash === '#textbook') {
            userMenu.node.classList.add('hidden');
          } else {
            userMenu.node.classList.remove('hidden');
          }
          authUser.node.onclick = () => {
            userMenu.node.classList.add('hidden');
            authBtn.node.classList.remove('hidden');
            window.localStorage.removeItem('usersId');
            window.localStorage.removeItem('token');
          }
        })
        .catch(() => console.log('Вы не зарегистрированы'));
    }
  }
}

export default Auth;