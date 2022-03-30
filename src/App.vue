<template>
  <div id="Main">
    <AuthorizationVue id="authForm" v-if="!this.cookie"/>
    <div id="preloader">
      <div id="loader"></div>
    </div>
    <div id="content">
    <div id="menu">
      <h1>MASTER-08</h1>
      
      <div id="buttonsForMenu">
        <router-link class="menuPunkt" :to="{ name: 'Monitoring' }">МОНИТОРИНГ</router-link>
        <router-link class="menuPunkt" :to="{ name: 'About' }">ДОПОЛЬНИТЕЛЬНАЯ ИНФОРМАЦИЯ</router-link>
        <router-link class="menuPunkt" :to="{ name: 'Settings' }">НАСТРОЙКИ</router-link>
      </div>
      <div id="connectionWithBS"> 
        <label for="">Связь с MASTER-08</label>
        <div class="lvlConnection" id="lvl1"></div>
        <div class="lvlConnection" id="lvl2"></div>
        <div class="lvlConnection" id="lvl3"></div>

        <button id="exit" @click='exit()' v-if="this.cookie && this.cookie != 'guest'">
          Выйти
        </button>
        <button id="enter" @click='enter()' v-if="!this.cookie || this.cookie == 'guest'">
          Войти
        </button>
        
      </div>
    </div>
    <div class="contentForRoute">
    <router-view class="viewRoute" v-slot='{Component}' >
      <Transition name="contentVue" mode="out-in">
        <component :is='Component' />
      </Transition>
    </router-view>
    </div>
  
    <footer id="footer">
      <img class="granch" style="width:15em;" src="@/assets/лого_оранж.png" alt=""><img class="openwrt" style="width:15em;" src="@/assets/external-content.duckduckgo.com.png" alt="">
    </footer>
    </div>
  </div>
</template>

<script>
import AuthorizationVue from './components/Authorization.vue';

const urlHostName = window.location.hostname;
const xhr = new XMLHttpRequest();
let cookie = document.cookie;

export default {
  name: 'App',
  components: AuthorizationVue,
  data() {
    return {
      titelXhr: [],
      cookie,
      ping: false,
    }
  },
  mounted() {
    const authForm = document.getElementById('authForm');
    const mainContent = document.getElementById('content');
    this.pingConnection();

    if (authForm.style.display != 'none') {
      mainContent.style.webkitFilter = 'blur(10px)';
    }
    
    this.cookie = document.cookie;

    // this.$nextTick(() => {
      // this.mainXhr();
    // })
  },
  methods: {
    mainXhr() {
      xhr.open('GET', 'http://localhost:3000/first_stage', true);
      xhr.send();
      this.titleXhr = JSON.parse(xhr.responseText);
    },
    pingConnection() {
      const lvl1 = document.getElementById('lvl1');
      const lvl2 = document.getElementById('lvl2');
      const lvl3 = document.getElementById('lvl3');
        xhr.timeout = 3000;
      setInterval(() => {
        xhr.open('POST', `http://${urlHostName}/header`, true);
        xhr.send('ok');
        xhr.ontimeout = () => {
          lvl1.style.background = 'yellow';
          lvl2.style.background = 'yellow';
          lvl3.style.background = '#616161';
        }
        xhr.onload = () => {
          if (xhr.response) {
            lvl1.style.background = '#0fb900';
            lvl2.style.background = '#0fb900';
            lvl3.style.background = '#0fb900';
          } else {
            lvl1.style.background = 'red';
            lvl2.style.background = '#616161';
            lvl3.style.background = '#616161';
          }
        }
        xhr.onerror = () => {
          lvl1.style.background = 'red';
          lvl2.style.background = '#616161';
          lvl3.style.background = '#616161';
          console.log('[error] Нет связи...')
        }
        
      }, 2000)
    },
    enter() {
      document.cookie = `${document.cookie};max-age=0;`;
      location.reload();
      window.location.href = '/';
    },
    exit() {
      document.cookie = `${document.cookie};max-age=0;`;
      location.reload();
    },
  }
}
</script>

<style>
  
  body {
    margin: 0;
    padding: 0;
    
  }


#preloader {
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    background: rgb(61, 61, 61);
} 
#loader {
 display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  background-image: url('./components/1493 (1).gif');
  width: 64px;
  height: 64px;
}

.contentVue-enter-active, .contentVue-leave-active {
  transition: all 0.5s linear;
  opacity: 1;
}

.contentVue-enter-from, .contentVue-leave-to {
  opacity: 0;
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
  .contentForRoute {
    background: #474747; 
    display:flex;
    justify-content:center;
    flex-direction:column;
    align-items:center;
    min-height: 47.5em;
  }
  .viewRoute {
    display:flex;
    width: 100%;
    justify-content:center;
    flex-direction:column;
    align-items:center;
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
    text-decoration: none;
    background: #292929;
    padding:30px;
    border: 1px solid #8C8C8C;
    color: #FFB300;
  }

  #authForm {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  #footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background: #333333;
  }
  .granch {
    margin-right: 5em;
  }

  #exit {
    color: chocolate;
    background: none;
    border: 1px solid gray;
    border-radius: 10px;
    width: 5em;
    cursor: pointer;
  }
  #enter {
    color: chocolate;
    background: none;
    border: 1px solid gray;
    border-radius: 10px;
    width: 5em;
    cursor: pointer;
  }
</style>
