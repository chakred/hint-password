<template>
  <div class="validation-hint-rules">
    <ul>
      <li
        v-for="rule in rules"
        :key="rule"
        :data-test-rule-indicator="rule"
        class="password-hint__rule password-hint__rule--fail"
      >
        <span>&#10003;</span>
        <div :class="setClass(rule.isValid)">{{ rule.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
const LINE_THROUGH = 'line-through';

export default {
  /**
   * Component name
   */
  name: "HintRules",

  /**
   * Props
   */
  props: {
    rules: {
      type: Object,
      required: true,
    },
  },

  /**
   * Methods
   */
  methods: {
    setClass(isValid) {
      return isValid ? LINE_THROUGH : ''
    }
  }
};
</script>