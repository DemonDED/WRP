<template>
  <div id="devices">
    <div>
      <div class="hForTable">Список подключенных устройств</div>
      <table>
        <tr>
          <th>MAC addr</th>
          <th>IP addr</th>
          <th>Link</th>
          <th>Host name</th>
        </tr>
        <tr v-for="item in linkData" :key="item">
          <td>{{ item[0] }}</td>
          <td>{{ item[1] }}</td>
          <td>{{ item[2] }}</td>
          <td>{{ item[3] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
const xhr = new XMLHttpRequest();
const urlHostName = window.location.hostname;

export default {
  data() {
    return {
      linkData: [],
    }
  },
  mounted() {
    this.devicesLinked();
  },
  methods: {
    devicesLinked() {
      xhr.open( 'GET', `http://${urlHostName}/fcgi/dumpleases` );
      xhr.send();
      xhr.onload = () => {
        this.linkData = JSON.parse(xhr.response);
      }
    }
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