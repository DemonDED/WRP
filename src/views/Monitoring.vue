<template>
  <div class="home">
    
    <div id="mainInformation">
    
      <!--
        Здесь должна быть общая информация по БС и портам в ней
      -->
      <div class="blockMainInformation">

        <div class="zag-1">
          <h1>Основная информация</h1>
        </div>

          <label style="font-size: 30px" for="" v-for="(value, name) in wsDataMonitoring.header" :key="name">{{ name }} <span>{{ value }}</span> </label>
          <label style="font-size: 30px" for="" v-for="(value, name) in wsDataMonitoring.sysmon" :key="name">{{ name }} <span>{{ value }}</span> </label>

      </div>
      <div class="blockMainInformation">

        <div class="zag-1">
          <h1>Питание</h1>
        </div>
          <label style="font-size: 30px" for="" v-for='(value, name) in wsDataMonitoring.powermon' :key="name">{{ name }} <span>{{ value }}</span> </label>
          <label style="font-size: 30px" for="" v-for='item in wsDataMonitoring.gpio_power' :key="item">{{ item.name }} <span>{{ item.value }}</span> </label>

      </div>
    </div>

    <div>
      <table>

        <tr>
          <th>Статус</th>
          <th>Порт</th>
          <th>MAC-адрес</th>
          <th>IP-адрес</th>
          <th>Tx</th>
          <th>Rx</th>
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

export default {
  name: 'Home',
  data() {
    return {
      wsDataMonitoring: [],
    }
  },
  mounted() {

    if (this.webSocketMonitoring === null || this.webSocketMonitoring.readyState !== WebSocket.OPEN) {
      if (this.webSocketMonitoring !== null) { this.webSocketMonitoring.close(); }
      this.webSocketMonitoring();
    }

  },
  methods: {
    webSocketMonitoring() {

      const wsMonitoring = new WebSocket(`ws://${urlHostName}:3000/monitoring`);

      wsMonitoring.onopen = function(event) {
        console.log('WebSocketMonitoring открыт...');
      }
      wsMonitoring.onmessage = function(event) {
        this.wsDataMonitoring = JSON.parse(event.data);
        console.log('Данные WebSocketMonitoring получены...');
      }
      wsMonitoring.onerror = function(error) {
        console.log('WebSocketMonitoring Error: ' + error);
      }
      wsMonitoring.onclose = function(event) {
        console.log('WebSocketMonitoring закрыто...')
        setInterval( () => {
          this.webSocketMonitoring();
        }, 2500)
      }

    }
  },
}
</script>

<style>

  .home {
    padding: 50px;
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
  }
  .zag-1 {
    display: flex;
    justify-content: center;
    height: 10%;
    width: 100%;
    background:#3B3B3B; 
    border-radius: 10px 10px 0px 0px;
    position: relative;
    box-shadow: 0px 0.3px 0.2px 0.1px;
  }
</style>