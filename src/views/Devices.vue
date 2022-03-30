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