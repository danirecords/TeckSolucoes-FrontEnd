<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl mb-4">Login</h1>
    <form @submit.prevent="doLogin" class="w-1/3 flex flex-col gap-2">
      <input v-model="email" type="email" placeholder="Email" class="p-2 border rounded" />
      <input v-model="password" type="password" placeholder="Senha" class="p-2 border rounded" />
      <button class="bg-blue-500 text-white py-2 rounded">Entrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = useAuthStore();

const doLogin = async () => {
  try {
    await auth.login(email.value, password.value);
    router.push("/");
  } catch {
    alert("Login inválido");
  }
};
</script>
