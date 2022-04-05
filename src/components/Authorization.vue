<template>
  <div id="about">
    <div class="auth">
    <h1>АВТОРИЗАЦИЯ</h1>
    <div class="groupForAuth">
    <label for="">Логин</label>
    <input id="loginInput" class="inputForAuth" type="text">
    </div>
    <div class="groupForAuth">
    <label for="">Пароль</label>
    <input id="passwordInput" class="inputForAuth" type="password">
    </div>
    <button id="enterButton" class="enterButton" @click="authSession()">
      <span id="textBtnAuth">ВОЙТИ</span>
      <img id="loaderForBtnAuth" src="@/components/load.svg" alt="загрузка..." style="display:none;">
      <img id="okForBtnAuth" src="@/components/ok.svg" alt="Oк" style="display:none;">
      <img id="notOkForBtnAuth" src="@/components/notOk.svg" alt="Ошибка" style="display:none;">
    </button>
    <label v-if="defendCounter === true" for="" style="color: red;">Превышено количество попыток ввода пароля</label>
    <button @click="guestSession()" style="color: #91BBFF;background:0;border:0;">Продолжить как гость</button>
  </div>
  </div>
</template>

<script>
const xhr = new XMLHttpRequest();
const urlHostName = window.location.hostname;
let timeToBlock = 0;

export default {
  data() {
    return {
      defendCounter: false,
      tokenAuth: [],
    }
  },
  methods: {
    guestSession() {
      document.cookie ='guest';
    },
    authSession() {
      const enterButton = document.getElementById('enterButton');
      const loader = document.getElementById('loaderForBtnAuth');
      const okLoad = document.getElementById('okForBtnAuth');
      const notOkLoad = document.getElementById('notOkForBtnAuth')
      const textBtn = document.getElementById('textBtnAuth');

      const login = document.getElementById('loginInput');
      const password = document.getElementById('passwordInput');
      
      // animation \\

      enterButton.disabled = true;
      textBtn.style.display = 'none';
      enterButton.style.width = '64px';
      enterButton.style.height = '64px';
      enterButton.style.borderRadius = '10px';
      loader.style.display = 'inline';
      // testing authorization \\
      let dataAuth = `{\"username\":\"${login.value}\", \"password\":\"${password.value}\"}`;
      xhr.onload = () => {
        this.tokenAuth = xhr.response;
      
      if (this.tokenAuth) {
        document.cookie = `${document.cookie};max-age:0;`
        document.cookie = this.tokenAuth;
        setTimeout(() => {
          loader.style.display = 'none';
          okLoad.style.display = 'inline';
        }, 2000)

        setTimeout(() => {
          okLoad.style.display = 'none';
          enterButton.style.width = '262px';
          textBtn.style.display = 'inline';
          enterButton.disabled = false;
        }, 4000)
        console.log('Welcome Administrator!');
      } else {
        timeToBlock = timeToBlock + 100;
        console.log(timeToBlock)
        
        setTimeout(() => {
          loader.style.display = 'none';
          notOkLoad.style.display = 'inline';
        }, 2000)

        setTimeout(() => {
          notOkLoad.style.display = 'none';
          enterButton.style.width = '262px';
          textBtn.style.display = 'inline';
          enterButton.disabled = false;
        }, 3000)
      }
    }
      xhr.open('POST', `http://${urlHostName}/fcgi/login`, true);
      xhr.send(dataAuth);
      if (timeToBlock == 300) {
        while (timeToBlock != 0) {
          enterButton.disabled = true;
          this.defendCounter = true;
          timeToBlock -= 10;
        }
      }




    },
  }
}
</script>

<style>

   .auth {
    color: #F0AA00;
    background: #616161;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 1px 2px 0.4px black;
    width: 450px;
    height: 400px;
  }

  .groupForAuth {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
  }

  .inputForAuth {
    background: #8C8C8C;
    border-radius: 4px;
    border: 1px solid #C2C2C2;
    width: 244px;
    height: 27px;

  }
  .enterButton {
    background: #616161;
    border: 1px solid #8C8C8C;
    box-shadow: 0 1px 2px 0.84px ;
    border-radius: 10px;
    width: 262px;
    height: 31px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    transition-duration: 0.3s;
  }
  .enterButton:hover {
    background: #6d6d6d;
  }
</style>