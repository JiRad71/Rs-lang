import Component from "../../../common/Component";
import Footer from "../footer";
import AuthModel from "./authModel";
import { IUserData, URL } from '../../../asset/utils/types';
import createElement from "./createElement";


class Auth {
  parent: HTMLElement;
  onSignin: (data: IUserData) => void;
  inputsData: IUserData;

  render(parentNode: HTMLElement) {
    const auth = createElement(parentNode, 'div', 'authorization');
    const form = new Component(auth, 'form', 'form');
    const title = new Component(form.node, 'h3', 'title', 'Bведите адрес электронной почты и пароль');
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
    
    const buttonLogin = new Component(form.node, 'button', 'login', 'Log in');
    buttonLogin.node.setAttribute('type', 'button');

    const buttonSignin = new Component(form.node, 'button', 'signin', 'Sign in');
    buttonSignin.node.setAttribute('type', 'button');

    this.inputsData = { email: inputEmail.value, password: inputPassword.value };

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

    buttonSignin.node.onclick = () => {
      this.onSignin(this.inputsData);
    };

    return auth;
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

  checkUser(authBtn: Component<HTMLElement>, authUser: Component<HTMLElement>, parent: Component<HTMLElement>) {
    if (window.localStorage.getItem('token')) {
      const resp = fetch(`https://rss-lang-backends.herokuapp.com/users/${window.localStorage.getItem('usersId')}`, {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      resp.then((data) => data.json())
        .then((data) => data)
        .then((data) => {
          authBtn.node.style.display = 'none';
          authUser = new Component(parent.node, 'button', 'navigation-menu__item', `${data.email}`);
          if (location.hash === '#textbook') {
            console.log('test');
            authUser.node.classList.add('hidden');
          } else {
            console.log('test1');
            authUser.node.classList.remove('hidden');
          }
          authUser.node.onclick = () => {
            authUser.destroy();
            authBtn.node.style.display = 'block';
            window.localStorage.removeItem('usersId');
            window.localStorage.removeItem('token');
          }
        });
    }
  }
}

export default Auth;