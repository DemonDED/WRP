<template>
  <div>
    <div class="hForTable">Станции AdHoc</div>
    <table>
      <tr>
        <th>MAC addr</th>
        <th>PowerLevel, dBm</th>
      </tr>
      <tr v-for="item in wifiData" :key="item">
        <td>{{ item[0] }}</td>
        <td>{{ item[1] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
const xhr = new XMLHttpRequest();
const urlHostName = window.location.hostname;

export default {
  data() {
    return {
      wifiData: [],
    }
  },
  mounted() {
    this.wifiResponse();
  },
  methods: {
    wifiResponse() {
      xhr.open( 'GET', `http://${urlHostName}/fcgi/wifi_adhoc`, true );
      xhr.send();
      xhr.onload = () => {
        this.wifiData = JSON.parse(xhr.response);
      }
    },
  },
}
</script>

<style>
  .hForTable {
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
</style>