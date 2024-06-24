<template>
  <!--<NavBar />-->
  <!--<Head />-->
  <RouterView />
  <!--TOAST <div class="sticky bottom-0">TOAST</div>-->
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { me } from './services/users';
import { getOneSwapShop } from "~/services/swapShops";
import { useUsersStore } from './stores/users/users';
import { useSwapShopStore } from "~/stores/swapShop";
import { onMounted } from 'vue';

const swapShopStore = useSwapShopStore();
const userStore = useUsersStore();
const router = useRouter();

onMounted(async () => {
  const idSwapShop = 1; // TODO replace by actual id
  swapShopStore.swapShop = await getOneSwapShop(idSwapShop);
});

// TODO move refresh token stuff somwhere else, only setInterval remains
const refreshToken = ()=>{
  if (!userStore.isConnected())
    return;

  me().then((res)=>{
    userStore.setAuth(res);
  }).catch((err)=>{
    userStore.logout(); // TODO remove logout maybe ? what to do if token is expired ?
    // show error 'you are disconnected'
    router.push({name: 'login'})
  });
}

refreshToken();

setInterval(()=>{ // TODO get expiration from token, and setTimout 10 sec before expiration
  refreshToken();
}, 100*1000); // TODO magic number 120 seconds (jwt lifetime) -20 seconds (LONG request time)
</script>