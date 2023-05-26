<script setup>
import { useStrongPasswordStore } from "@/stores/strong-password";
import InputPassword from "@/components/form/InputPassword.vue";
import HintRules from "@/components/HintRules.vue";
import ValidSummary from "@/components/ValidSummary.vue";

const store = useStrongPasswordStore();
</script>

<template>
  <div class="password-wrapper">
    <div>
      <input-password />
      <valid-summary />
      <hint-rules :rules="store.getHandledRules" />
    </div>
  </div>
</template>