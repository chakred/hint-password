<script setup>
import { ref, watch } from "vue";
import { useStrongPasswordStore } from "@/stores/strong-password";

const data = ref("");
const store = useStrongPasswordStore();

/**
 * Watcher
 */
watch(data, (currentValue) => {
  store.fillPassword(currentValue);
});
</script>

<template>
  <div class="validation-password-field">
    <label for="password">Password</label>
     <input 
        id="password"
        v-model="data" 
        data-test="password-field" 
        type="password"
      />
  </div>
</template>