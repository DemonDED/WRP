<template>
  <div class="about">
    <div id='adhocAndArp'>
      <AdhocTable></AdhocTable>
      <ArpTable></ArpTable>
    </div>
    <div id='routeTable'>
      <RouteTable></RouteTable>
    </div>
    <div id='devices'>
      <Devices></Devices>
    </div>
  </div>
</template>

<script>
import AdhocTable from './AdhocTable.vue';
import ArpTable from './ArpTable.vue';
import RouteTable from './RouteTable.vue';
import Devices from './Devices.vue';

export default {
  name: 'AdditionalInformation',
  components: {
    AdhocTable,
    ArpTable,
    RouteTable,
    Devices
  },
}
</script>

<style>
  #adhocAndArp, #routeTable, {
    width: 60%;
  }
  #adhocAndArp {
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
  }
  .hForTable {
    background: #363636;
    background-size: cover;
    width: 100%;
    height: 3em;
    position: relative;
    z-index: 2;
    border-radius: 10px 10px 0px 0px;
    color: #FFB300;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: black 0px 3px 2px;
  }
  table {
    background: #636363;
    border-radius: 0px 0px 10px 10px;
  }
</style>