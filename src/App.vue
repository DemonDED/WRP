<template>
  <div id="Main">
    <div id="menu">
      <h1>MASTER-08</h1>
      <div id="buttonsForMenu">
        <router-link class="menuPunkt" to="/">ПУНКТ МЕНЮ 1</router-link>
        <router-link class="menuPunkt" to="/">ПУНКТ МЕНЮ 2</router-link>
        <router-link class="menuPunkt" to="/">ПУНКТ МЕНЮ 3</router-link>
      </div>
      <div id="connectionWithBS"> 
        <label for="">Связь с MASTER-08</label>
        <div class="lvlConnection" id="lvl1"></div>
        <div class="lvlConnection" id="lvl2"></div>
        <div class="lvlConnection" id="lvl3"></div>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
  #menu {
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    align-items: center;
    flex-direction: row;
    background: #333333;
    color: #FFB300;
    text-shadow: black 0px 3px 2px;
    font-family: "AECPoints";
  }
  #buttonsForMenu {
    display: flex;
    justify-content: space-around;
    flex-direction: row;

  }
  #connectionWithBS {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .lvlConnection {
    background: #616161;
    width: 30px;
    height: 30px;
    margin: 10px;
  }
  .menuPunkt {
    background: #292929;
    padding:30px;
    border: 1px solid #8C8C8C;
  }
</style>
