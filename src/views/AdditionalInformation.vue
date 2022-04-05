<template>
  <div class="about">
    <AdhocTable></AdhocTable>
    <ArpTable></ArpTable>
    <RouteTable></RouteTable>
    <Devices></Devices>
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
