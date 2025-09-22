<template>
  <div class="p-6">
    <h1 class="text-2xl mb-4">Processamentos</h1>

    <UploadForm @uploaded="fetchData" />

    <table class="table-auto w-full mt-6 border">
      <thead>
        <tr>
          <th>Arquivo</th>
          <th>Data</th>
          <th>Status</th>
          <th>Usuário</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in processamentos" :key="p.id">
          <td>{{ p.arquivo_excel }}</td>
          <td>{{ new Date(p.created_at).toLocaleString() }}</td>
          <td>{{ p.status }}</td>
          <td>{{ p.user?.name }}</td>
          <td class="flex gap-2">
            <a v-if="p.arquivo_excel" :href="apiUrl+`/processamentos/${p.id}/download-excel`" target="_blank">
              Baixar Excel
            </a>
            <a v-if="p.arquivo_cnab" :href="apiUrl+`/processamentos/${p.id}/download-cnab`" target="_blank">
              Baixar CNAB
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/axios";
import UploadForm from "../components/UploadForm.vue";

const processamentos = ref([]);
const apiUrl = "http://localhost:8080/api";

async function fetchData() {
  const { data } = await api.get("/processamentos");
  processamentos.value = data.data;
}

onMounted(fetchData);
</script>
