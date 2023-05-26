<template>
  <div class="validation-hint-rules">
    <ul>
      <li
        v-for="rule in rules"
        :key="rule"
        :data-test-rule-indicator="rule.name"
        :class="`password-hint__rule--${setClass(rule.isValid, 'pass', 'fail')}`"
        class="password-hint__rule"
      >
        <span>&#10003;</span>
        <div :class="setClass(rule.isValid, 'line-through')">{{ rule.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script>

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
    setClass(condition, success, other = '') {
      return condition ? success : other;
    }
  }
};
</script>