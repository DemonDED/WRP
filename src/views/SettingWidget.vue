<template>
<div>

  <div id="settingsGlobal">
      <div>
        <h1>НАСТРОЙКИ</h1>  
      </div>
    <div class="settingsForIp" v-for="item in dataSettings.network" :key="item"> 
      <label for="ipValueForSettings" >{{item.name}}</label>
      <input class="enterIp" name="ipValueForSettings" type="text">
    </div>
  </div>


  <div class="settingsMain">
    <button class="btnForInterface" id="acceptSettings" @click="acceptSettings()">
      Принять настройки
    </button>
    <button class="btnForInterface" id="saveSettings" @click="saveSettings()">
      Сохранить настройки
    </button>
    <button class="btnForInterface" id="rebootBs" @click="rebootBs()">
      Перезагрузка
    </button>
  </div>

</div>
</template>

<script>
const xhr = new XMLHttpRequest();
const urlHostName = window.location.hostname;


export default {
  data() {
    return {
      dataResponseForFirst: [],
      dataSettings: [],
    }
  },
  mounted() {

    xhr.open( 'GET', `http://${urlHostName}/fcgi/get_settings`, true );
    xhr.send();
    this.dataSettings = JSON.parse(xhr.response);


  },
  methods: {
    acceptSettings() {


      xhr.open( 'POST', `http://${urlHostName}/save_settings`, true );
      xhr.send()



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
      

      xhr.open( 'POST', `http://${urlHostName}/set_settings`, true );
      xhr.send();

    },
    rebootBs() {

      let rebootQuestion = confirm( 'Перезагрузить устройство?' );

      if ( rebootQuestion ) {
        xhr.open( 'GET', `http://${urlHostName}/fcgi/reboot`, true );
        xhr.send();
      }

    },

  }
}
</script>

<style>

 #btn1 {
   border: 0px;
   border-radius: 10px;
   background: #8c8c8c;
   box-shadow: 0px 1px 3px 0.65px;
   width: 10em;
   height: 2em;
   cursor: pointer;
 }
 .btnFoInterface {
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
    width: 40%;
    background: #8C8C8C;
    border: 1px solid #C2C2C2;
    border-radius: 10px;
    text-align: center;
  }
  .enterIp:focus {
    box-shadow: 0.5px 0.5px 10px 0.1px white;
    outline: none;
  }

</style>