<template>
<div>

  <div id="settingsGlobal">
      <div>
        <h1>НАСТРОЙКИ</h1>  
      </div>
    <div class="settingsForIp" v-for="item in dataSettings.network" :key="item"> 
      <label for="ipValueForSettings" >{{ item.name }}</label>
      <input class="enterIp" name="ipValueForSettings" type="text" :value="item.ip_addr">
    </div>

    <div class="gpioSettings" v-for="gpio in dataSettings.gpio_power" :key="gpio">
      <label for='checkBox'>{{ gpio.name }}</label>
      <input type="checkbox" name="checkBox" :id="gpio.name">
    </div>

    <!--<input class="enterIp" id="test" type="text" pattern="(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([1][6-9]|[2][0-9]|[3][0-1]))">
    <input class="enterIp" id="test" type="text" pattern="(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([1][6-9]|[2][0-9]|[3][0-1]))">
    <input class="enterIp" id="test" type="text" pattern="(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([1][6-9]|[2][0-9]|[3][0-1]))">-->

  </div>

  <div class="settingsMain" style="display: flex;">
    <button class="btnForInterface" id="acceptSettings" @click="acceptSettings()">
      <span class="textForBtn" id="textForBtn">Принять настройки</span>
      <img class="loaderForBtn" id="loaderForBtn" src="../components/load.svg" alt="" style="display:none;">
      <img class="okForBtn" id="okForBtn" src="../components/ok.svg" alt="" style="display:none;">
    </button>
    <button class="btnForInterface" id="saveSettings" @click="saveSettings()">
      <span class="textForBtn" id="textForBtn2">Сохранить настройки</span>
      <img class="loaderForBtn" id="loaderForBtn2" src="../components/load.svg" alt="" style="display:none;">
      <img class="okForBtn" id="okForBtn2" src="../components/ok.svg" alt="" style="display:none;">
    </button>
    <button class="btnForInterface" id="rebootBs" @click="rebootBs()">
      <span class="textForBtn" id="textForBtn3">Перезагрузка</span>
      <img class="loaderForBtn" id="loaderForBtn3" src="../components/load.svg" alt="" style="display:none;">
      <img class="okForBtn" id="okForBtn3" src="../components/ok.svg" alt="" style="display:none;">
    </button>
  </div>

</div>
</template>

<script>
const xhr = new XMLHttpRequest();
const urlHostName = window.location.hostname;


//  const regExp = /^(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([1][6-9]|[2][0-9]|[3][0-1]))?$/;


export default {
  data() {
    return {
      dataResponseForFirst: [],
      dataSettings: [],
      statusIp: true,
    }
  },
  mounted() {

    xhr.open( 'GET', `http://${urlHostName}/fcgi/get_settings`, true );
    xhr.send();
    xhr.onload = () => {
      this.dataSettings = JSON.parse(xhr.response);
    }

    setInterval(() => {
      this.testForIpValid();
    }, 3000)
    


  },
  methods: {
    loaderForButtons (buttonId, loaderId, okId, textId) {
    
    const btnAni = document.getElementById(buttonId);
    const loader = document.getElementById(loaderId);
    const okLoad = document.getElementById(okId);
    const textBtn = document.getElementById(textId);
    
    btnAni.disabled = true;
    textBtn.style.display = 'none';
    btnAni.style.width = '64px';
    loader.style.display = 'inline';

    setTimeout(() => {
      loader.style.display = 'none';
      okLoad.style.display = 'inline';
    }, 2000)
    
    setTimeout(() => {
      okLoad.style.display = 'none';
      btnAni.style.width = '324px';
      textBtn.style.display = 'inline';
      btnAni.disabled = false;
    }, 4000)

    },
    testForIpValid() {
      // const buttonsForSettings = document.getElementsByClassName('btnForInterface');
      const saveSettings = document.getElementById('saveSettings');
      const acceptSettings = document.getElementById('acceptSettings');
      const ipValue = document.getElementsByClassName('enterIp');
      const regExp = /^(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([1][6-9]|[2][0-9]|[3][0-1]))?$/;
      let check = 0;
      for ( let i = 0 ; i<=ipValue.length ; i++ ) {
        let testResult = regExp.test(ipValue[i].value);
        if (testResult) {
          check++;
        }
      }
      
      if (check == ipValue.length) {
        saveSettings.disabled = false;
        acceptSettings.disabled = false;
      } else {
        saveSettings.disabled = true;
        acceptSettings.disabled = true;
      }
       
    },

    acceptSettings() {
      ///////тестирование блокировки по проверке введенных данных\\\\\\\\\\\
////////////////////////////////////////////////////////////
      let buttonId = 'acceptSettings';
      let loaderId = 'loaderForBtn';
      let okId = 'okForBtn';
      let textId = 'textForBtn';
      this.loaderForButtons(buttonId, loaderId, okId, textId);



      xhr.open( 'POST', `http://${urlHostName}/save_settings`, true );
      xhr.send('');


    //////Второй вариант обработчика\\\\\\

    //   const btn1 = document.querySelector('#btn1');
    //   xhr.open('GET', 'http://localhost:3000/first_stage', true);
    //   xhr.send();
    //   xhr.onreadystatechange = () => {
    //     if (xhr.readyState != 4) return;
    //     btn1.innerHTML = 'Готово!';
    //     if (xhr.status != 200) {
    //       console.log(xhr.status + ': ' + xhr.statusText);
    //     } else {
    //       console.log(xhr.responseText);
    //       this.dataResponseForFirst = JSON.parse(xhr.responseText);
    //       setTimeout(function () {
    //         btn1.disabled = false;
    //         btn1.innerHTML = 'Тестовый запрос 1';
    //       }, 2000)
    //     }
    //   }
    // btn1.innerHTML = 'Загружаю...';
    // btn1.disabled = true; 
    },
    saveSettings() {
      
      let buttonId = 'saveSettings';
      let loaderId = 'loaderForBtn2';
      let okId = 'okForBtn2';
      let textId = 'textForBtn2';
      this.loaderForButtons(buttonId, loaderId, okId, textId);
      xhr.open( 'POST', `http://${urlHostName}/set_settings`, true );
      xhr.send('ok');

    },
    rebootBs() {
      let buttonId = 'rebootBs';
      let loaderId = 'loaderForBtn3';
      let okId = 'okForBtn3';
      let textId = 'textForBtn3';
      
      let rebootQuestion = confirm( 'Перезагрузить устройство?' );

      if ( rebootQuestion ) {
        xhr.open( 'GET', `http://${urlHostName}/fcgi/reboot`, true );
        this.loaderForButtons(buttonId, loaderId, okId, textId);
        xhr.send();
      }

    },

  }
}
</script>

<style>

 /* #btn1 {
   border: 0px;
   border-radius: 10px;
   background: #8c8c8c;
   box-shadow: 0px 1px 3px 0.65px;
   width: 10em;
   height: 2em;
   cursor: pointer;
 } */
 .btnForInterface {
    margin: 30px;
    width: 324px;
    height: 64px;
    background: #616161;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    box-shadow: 0px 1px 4px 0.65px;
    border-radius: 40px;
    border: 0;
    font-size: 24px;
    cursor:pointer;
    transition-duration: 0.1s;
    position: relative;
  }


  .enterIp {
    width: 50%;
    background: #8C8C8C;
    border: 1px solid #C2C2C2;
    border-radius: 10px;
    text-align: center;
  }
  .enterIp:focus {
    box-shadow: 0.5px 0.5px 10px 0.1px white;
    outline: none;
  }
  .enterIp:invalid {
    border: 1px solid red;
    content: 'Invalid Syntax';
  }

</style>