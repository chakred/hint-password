<script setup>
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useStrongPasswordStore } from "@/stores/strong-password";
import { StrengthOptionLabel} from "@/domain/password/strength-options";

const store = useStrongPasswordStore();
const { isPassStrong } = storeToRefs(store);
</script>

<template>
  <div class="validation-summary">
    <div>
      <span :class="store.getValidRuleStatus">*</span>
      <span class="separator">*</span>
      <span :class="store.getValidRuleStatus">*</span>
    </div>
    <p class="message" data-test="validation-summary">{{StrengthOptionLabel[store.getValidRuleStatus]}}</p>
  </div>
</template>
