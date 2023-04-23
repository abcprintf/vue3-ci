<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useTemplateStore } from "./stores/template";
import { useUserLoginStore } from "./stores/auth";
import { RouterLink, RouterView, useRouter } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

const isAuthened = ref(false);
const message = ref("");

const router = useRouter();

const templateStore = useTemplateStore();
const userStore = useUserLoginStore();
const { getStyle } = storeToRefs(templateStore);
const { getUser } = storeToRefs(userStore);

const verifyAuth = () => {
  if (typeof getUser.value.id === "undefined") {
    router.push({ path: "/login" });
    return;
  }

  isAuthened.value = getStyle.value.isAuthen;
};

onMounted(() => {
  verifyAuth();
});

templateStore.$subscribe((mutation, state) => {
  // console.log(mutation);
  // console.log(state);
  isAuthened.value = state.style.isAuthen;
  // console.log(mutation.events.key);
  // if (mutation.events.key === "isAuthen" && mutation.events.newValue) {
  //   isAuthened.value = mutation.events.newValue;
  // }

  message.value = getUser.value.name;
});
</script>

<template>
  <header v-if="isAuthened">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <div class="wrapper">
      <HelloWorld :msg="`Hello : ${message}`" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
