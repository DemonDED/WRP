<template>
  <div>
    <div>Станции AdHoc</div>
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