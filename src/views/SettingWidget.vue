<template>
<div>
  <ErrorData v-if="!dataSettings"></ErrorData>
  <div id="settingsGlobal" v-if="dataSettings">
      <div class='h1ForTable'>
        <h1>НАСТРОЙКИ</h1>  
      </div>
    <div class="settingsForIp" v-for="item in dataSettings.network" :key="item"> 
      <label class="portNameIp" for="ipValueForSettings" >{{ item.name }}</label>
      <input class="enterIp" name="ipValueForSettings" type="text" :value="item.ip_addr" pattern="(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([1][6-9]|[2][0-9]|[3][0-1]))">
    </div>

    <div v-for='(value, name) in dataSettings.header' :key='value'>
      <label>{{ name }}</label>
      <input  />
    </div>

    <div class="gpioSettings" v-for="gpio in dataSettings.gpio_power" :key="gpio">
      <label class="gpioNames" for='checkBox'>{{ gpio.name }}</label>
      <input class="checkBoxValue" type="checkbox" name="checkBox" :id="gpio.name">
    </div>
  </div>

  <div class="settingsMain" style="display: flex;" v-if="dataSettings">
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
import ErrorData from '@/components/ErrorData.vue';

const xhr = new XMLHttpRequest();
const urlHostName = window.location.hostname;


//  const regExp = /^(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([1][6-9]|[2][0-9]|[3][0-1]))?$/;


export default {
  components: {
    ErrorData,
  },
  data() {
    return {
      dataSettings: [],
    }
  },
  mounted() {
    xhr.onload = () => {
      this.dataSettings = JSON.parse(xhr.response);
    }
    xhr.open( 'GET', `http://${urlHostName}/fcgi/get_settings`, true );
    xhr.send();

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
      const saveSettings = document.getElementById('saveSettings');
      const acceptSettings = document.getElementById('acceptSettings');
      const ipValue = document.getElementsByClassName('enterIp');

      const regExp = /^(25[0-4]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([1][6-9]|[2][0-9]|[3][0-1]))?$/;
      let check = 0;
      for ( let i = 0 ; i<=ipValue.length ; i++ ) {
        regExp.test(ipValue[i].value);
        if (regExp.test(ipValue[i].value)) {
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
      const portNameIp = document.getElementsByClassName('portNameIp');
      const ipValue = document.getElementsByClassName('enterIp');
      const gpioNamesParams = document.getElementsByClassName('gpioNames');
      const checkGpio = document.getElementsByClassName('checkBoxValue');

      let buttonId = 'acceptSettings';
      let loaderId = 'loaderForBtn';
      let okId = 'okForBtn';
      let textId = 'textForBtn';

      let n = 0;
      let portNames = [];
      let network = [];
      for (let item in portNameIp) {
        portNames.push( item.textContent );
      }
      for ( let item in ipValue ) {
        network.push( `{"name":"${portNames[n]}","ip_addr":"[${item.value}]"}` );
        n++;
      }
      n = 0;
      let gpioState = [];
      let gpioPower = [];
      for ( let i = 0; i<=checkGpio.length; i++ ) {
        if ( checkGpio[n].checked ) {
          gpioState.push( "Up" );
          n++;
        } else {
          gpioState.push( "Down" );
          n++;
        }
      }
      n = 0;
      for ( let item in gpioNamesParams ) {
          gpioPower.push( `"state":"${gpioState[n]}","name":"${item.textContent}"` );
          n++;
        }
      
      let newSettingsMassive = `{"header":{},"gpio_power":[${gpioPower}],"network":[${network}]}`;
      this.loaderForButtons(buttonId, loaderId, okId, textId);

      xhr.open( 'POST', `http://${urlHostName}/fcgi/save_settings`, true );
      xhr.send(newSettingsMassive);
    },
    saveSettings() {
      
      let buttonId = 'saveSettings';
      let loaderId = 'loaderForBtn2';
      let okId = 'okForBtn2';
      let textId = 'textForBtn2';
      this.loaderForButtons(buttonId, loaderId, okId, textId);
      xhr.open( 'POST', `http://${urlHostName}/fcgi/set_settings`, true );
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
  #settingsGlobal {
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #636363;
    border-radius: 1px;
  }
  .settingsForIp, .gpioSettings {
    display:flex;
    justify-content: space-around;
    align-items:center;
    width:70%;
  }
  .h1ForTable {
    display:flex;
    justify-content: center;
    background: #363636;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    color: #FFB300;
    text-shadow: black 0px 3px 2px;
  }
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
    width: 300px;
    height: 30px;
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
    box-shadow: 0.5px 0.5px 10px 0.1px red;
    border: 1px solid red;
    content: 'Invalid Syntax';
  }

</style>