<template>
  <div class="about">
    <div id="settingsAp">
      <div>
        <label class="ethName" for="formIp">eth.Num</label>
        <input class="enterIp" type="text" name="formIp">
      </div>
      <div>
        <label class="ethName" for="formIp">eth.Num</label>
        <input class="enterIp" type="text" name="formIp">
      </div>
      <div>
        <label class="ethName" for="formIp">eth.Num</label>
        <input class="enterIp" type="text" name="formIp">
      </div>
      <div>
        <label class="ethName" for="formIp">eth.Num</label>
        <input class="enterIp" type="text" name="formIp">
      </div>
      <div>
        <label class="ethName" for="formIp">eth.Num</label>
        <input class="enterIp" type="text" name="formIp">
      </div>
    </div>
    <button class="container" id="btnFoInterface" @click="testClick()">
      <span class="text" id="textBtn">ТЕСТОВЫЙ ЗАПРОС</span>
      <img id="loaderForBtn" src="../components/load.svg" alt="" style="display:none;">
      <img id="okForBtn" src="../components/ok.svg" alt="" style="display:none;">
    </button>
    
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
   testClick() {
    const btnAni = document.getElementById('btnFoInterface');
    const loader = document.getElementById('loaderForBtn');
    const okLoad = document.getElementById('okForBtn');
    const textBtn = document.getElementById('textBtn');
    
    btnAni.disabled = true;
    textBtn.style.display = 'none';
    btnAni.style.width = '64px';
    loader.style.display = 'inline';

    setTimeout(() => {
      loader.style.display = 'none';
      okLoad.style.display = 'inline';
    }, 2000)
    
    setTimeout(() => {
      okLoad.style.display = 'none';
      btnAni.style.width = '324px';
      textBtn.style.display = 'inline';
      btnAni.disabled = false;
    }, 4000)
    
   }
  }
}
</script>

<style>
  #btnFoInterface {
    margin: 30px;
    width: 324px;
    height: 64px;
    background: #616161;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    box-shadow: 0px 1px 4px 0.65px;
    border-radius: 40px;
    border: 0;
    font-size: 24px;
    cursor:pointer;
    transition-duration: 0.1s;
    position: relative;
  }

  #btnFoInterface2 {
    margin: 30px;
    width: 324px;
    height: 64px;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 0px 1px 4px 0.65px;
    border-radius: 40px;
    border: 0;
    font-size: 24px;
    cursor:pointer;
    transition-duration: 0.1s;
    position: relative;
  }

  #settingsAp {
    display: flex;
    width: 40%;
    height: 100%;
    justify-content: center;
    align-content: space-between;
    flex-direction: column;
  }
  #settingsAp > div {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    margin-bottom: 10px;
  }
  .ethName {
    font-size: 25px;
  }
  .enterIp {
    width: 40%;
    background: #8C8C8C;
    border: 1px solid #C2C2C2;
    border-radius: 10px;
    text-align: center;
  }
  .enterIp:focus {
    box-shadow: 0.5px 0.5px 10px 0.1px white;
    outline: none;
  }
/* #btnFoInterface:after {
  top: 1px;
  width: 200px;
}
#btnFoInterface:active:after {
    position: absolute;
    margin: 30px;
    width: 324px;
    height: 64px;
    background: #616161;
    box-shadow: 0px 1px 4px 0.65px;
    border-radius: 40px;
    border: 0;
    top:0px;
    font-size: 24px;
    cursor:pointer;
    transition: all 0.1s;
  } */

  
/* .contentVue-enter-active, .contentVue-leave-active {
  transition: all 0.3s linear;
}

.contentVue-enter, .contentVue-leave-to {
  opacity: 1;
} */
  
  #btnFoInterface:hover {
    background: #777777 ;
  }
  
  
 



 
  
</style>
