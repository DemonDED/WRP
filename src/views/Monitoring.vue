<template>
  <div class="home">
    
    <div id="mainInformation">
    
      <!--
        Здесь должна быть общая информация по БС и портам в ней
      -->
      <div class="blockMainInformation">

        <div class="zag-1">
          <h1 class='h1'>Основная информация</h1>
        </div>
          <div class="dataWs" v-for="(value, name) in this.wsDataMonitoring.header" :key="name">
            <label style="font-size: 25px" for="" >{{ name }}</label> <span style="font-size: 25px">{{ value }}</span>
          </div>
          <div class="dataWs" v-for="(value, name) in this.wsDataMonitoring.sysmon" :key="name">
            <label style="font-size: 25px" for="" >{{ name }}</label> <span style="font-size: 25px">{{ value }}</span>
          </div>
          
      </div>
      <div class="blockMainInformation">

        <div class="zag-1">
          <h1 class='h1'>Питание</h1>
        </div>
          <div class="dataWs" v-for='(value, name) in this.wsDataMonitoring.powermon' :key="name">
            <label style="font-size: 23px" for="" >{{ name }}</label> <span style="font-size: 23px">{{ value }}</span>
          </div>
          <div class="dataWs" v-for='item in this.wsDataMonitoring.gpio_power' :key="item">
            <label style="font-size: 20px" for="" >{{ item.name }}</label> <span style="font-size: 23px">{{ item.value }}</span>
          </div>

      </div>
    </div>

    <div>
      <div class="back"> <h1>Мониторинг</h1> </div>
      <table id='monitoringTable'>
        <tr class="hTable">
          <th>Порт</th>
          <th>MAC-адрес</th>
          <th>IP-адрес</th>
          <th>Tx</th>
          <th>Rx</th>
          <th>Статус</th>
        </tr>

        <tr v-for='item in wsDataMonitoring.network' :key="item">
          <td>{{ item.name }}</td>
          <td>{{ item.mac_addr }}</td>
          <td> <label v-for='items in item.ip_addr' :key="items">{{ items }}</label> </td>
          <td>{{ item.stats64.tx_bytes }}</td>
          <td>{{ item.stats64.rx_bytes }}</td>
          <td>{{ item.operstate }}</td>
        </tr>

      </table>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
const urlHostName = window.location.hostname;
const xhr = new XMLHttpRequest();

export default {
  name: 'Home',
  data() {
    return {
      wsDataMonitoring: [],
      wsMonitoring: null,
    }
  },
  mounted() {
    xhr.open('GET', 'http://localhost:3001/first_stage', true)
    xhr.send();
    xhr.onload = () => {
      this.wsDataMonitoring = JSON.parse(xhr.response);
    }
    // this.webSocketMonitoring();
    

  },
  methods: {
    webSocketMonitoring() {

    if (this.wsMonitoring === null || this.wsMonitoring.readyState !== WebSocket.OPEN) {

      if (this.wsMonitoring !== null) { this.wsMonitoring.onclose(); }
      this.wsMonitoring = new WebSocket(`ws://${urlHostName}:3000/monitoring`);

      this.wsMonitoring.onopen = function(event) {
        console.log(`[open] Соединение установлено: ${event.code}`);
      }
      this.wsMonitoring.onmessage = (event) => {
        this.wsDataMonitoring = JSON.parse(event.data);
        console.log('[message] Данные WebSocketMonitoring получены...');
      }
      this.wsMonitoring.onerror = function(error) {
        console.log('[error] WebSocketMonitoring Error: ' + error);
      }
      this.wsMonitoring.onclose = function(event) {
        if (event.wasClean) {
          console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
          console.log('Соединение прервано...');
        }
        
        setInterval( () => {
          console.log("[reconnect] Попытка переподключения к серверу...")
          this.webSocketMonitoring();
        }, 2500)
      }
      }

    }
  },
}
</script>

<style>

  .home {
    padding: 50px;
  }
  .h1 {
    color: #FFB300;
  }
  table {
    border-radius: 10px;
    background: #616161;
  }
  .h1ForTable {
  }
  .h1ForTable > th {
    background: #3B3B3B;
    padding: 10px;
    background-size: cover;
  }
  #mainInformation {
    display: flex;
    width: 70%;
    flex-direction: row;
    justify-content: space-around;
  }
  .dataWs {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    color: #FFB300;
    width: 100%;
  }
  .blockMainInformation {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #616161;
    border-radius: 10px;
    box-shadow: 0px 0.1px 0.3px 0px;
    width: 400px;
    height: 100%;
    margin-bottom: 2em;
  }
  .zag-1 {
    display: flex;
    justify-content: center;
    height: 10%;
    width: 100%;
    background:#363636; 
    border-radius: 10px 10px 0px 0px;
    position: relative;
    text-shadow: black 0px 3px 2px;
  }
  #monitoringTable {
    color: #FFB300;
    font-size: 24px;
    padding: 20px;
  }
  .back {
    background: #363636;
    background-size: cover;
    width: 100%;
    height: 3em;
    top: 20px;
    position: relative;
    z-index: 2;
    border-radius: 10px 10px 0px 0px;
    color: #FFB300;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: black 0px 3px 2px;
  }
  .hTable {
    z-index: 4;
  }
</style>