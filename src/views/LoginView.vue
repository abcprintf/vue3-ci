<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTemplateStore } from "./../stores/template";
import { useUserLoginStore } from "./../stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const storeTemplate = useTemplateStore();
const storeUser = useUserLoginStore();
const { getUser } = storeToRefs(storeUser);

/**
 * States
 **/
const formData = {
  username: null,
  password: null,
};

/**
 * Methods
 **/
const checkForm = (event) => {
  event.preventDefault();

  /**
   * setUser
   **/
  storeUser.$patch({ user: { id: 1, name: formData.username } });

  /**
   * setStyle
   **/
  storeTemplate.$patch({ style: { isAuthen: true } });

  /**
   * route to dashboard
   **/
  router.push({ path: "/" });
};

/**
 * onMounted
 **/
onMounted(() => {
  if (typeof getUser.value.id !== "undefined") {
    router.push({
      path: "/",
    });
  }
});
</script>

<template>
  <div>
    <h1>Login Page</h1>
    <form @submit="checkForm">
      <div class="form-group">
        <label>Username :</label>
        <input v-model="formData.username" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label>Password :</label>
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
