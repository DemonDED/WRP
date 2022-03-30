<template>
  <div id="route">
    <div class="dataRoute">
      <table>
        <div class="hForTable">Таблица OSPF соседей</div>
        <tr>
          <th>Router ID</th>
          <th>Adj Address</th>
          <th>Adj Interface</th>
        </tr>
        <tr v-for="item in ospfData" :key="item">
          <td>{{item[0]}}</td>
          <td>{{item[1]}}</td>
          <td>{{item[2]}}</td>
        </tr>
      </table>
    </div>
    <div class="dataRoute">
      <div class="hForTable">Таблица маршрутизации</div>
      <table>
        <tr>
          <th>DST</th>
          <th>GATEWAY</th>
          <th>INTERFACE</th>
          <th>METRIC</th>
        </tr>
        <tr v-for="item in routeData" :key="item">
          <td>{{ item.dst }}</td>
          <td>{{ item.gateway }}</td>
          <td>{{ item.dev }}</td>
          <td>{{ item.metric }}</td>
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
      routeData: [],
      ospfData: [],
    }
  },
  mounted() {
    this.ipRouteData();
    this.ospf_Data();
  },
  methods: {
    ipRouteData() {
      xhr.open( 'GET', `http://${urlHostName}/fcgi/ip_route`, true );
      xhr.send();
      xhr.onload = () => {
        this.routeData = JSON.parse(xhr.response);
      }
    },
    ospf_Data() {
      xhr.open( 'GET', `http://${urlHostName}/fcgi/ospf_table_monitoring`, true );
      xhr.send();
      xhr.onload = () => {
        this.ospfData = JSON.parse(xhr.response);
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