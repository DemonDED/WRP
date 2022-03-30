<template>
  <div>
    <div>Таблица ARP</div>
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