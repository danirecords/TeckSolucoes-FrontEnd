<template>
  <form @submit.prevent="upload" class="flex gap-2 items-center">
    <input type="file" @change="onFileChange" />
    <input v-model="fundo" type="text" placeholder="Fundo" />
    <input v-model="sequencia" type="text" placeholder="Sequência" />
    <button class="bg-green-500 text-white px-4 py-2 rounded">Enviar</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/axios";

const fundo = ref("");
const sequencia = ref("");
const file = ref(null);

function onFileChange(e) {
  file.value = e.target.files[0];
}

async function upload() {
  const formData = new FormData();
  formData.append("arquivo", file.value);
  formData.append("fundo", fundo.value);
  formData.append("sequencia", sequencia.value);

  await api.post("/processamentos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  alert("Arquivo enviado!");
}
</script>
