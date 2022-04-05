<template>
  <div>
    <div class="hForTable">Таблица ARP</div>
    <table>
      <tr>
        <th>DST</th>
        <th>INTERFACE</th>
        <th>MAC</th>
        <th>STATE</th>
      </tr>
      <tr v-for="item in neighData" :key="item">
        <td>{{ item.dst }}</td>
        <td>{{ item.dev }}</td>
        <td>{{ item.lladdr }}</td>
        <td>{{ item.state[0] }}</td>
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
      neighData: [],
    }
  },
  mounted() {
    this.ipNeighData();
  },
  methods: {
    ipNeighData() {
      xhr.open( 'GET', `http://${urlHostName}/fcgi/ip_neigh`, true );
      xhr.send();
      xhr.onload = () => {
        this.neighData = JSON.parse(xhr.response);
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