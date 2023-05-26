import { describe, it, beforeEach, expect } from "vitest";
import { mount } from "@vue/test-utils";

import App from "@/App.vue";
import { createPinia } from "pinia/dist/pinia";
import { RULE } from "@/domain/password/rules";
import { useStrongPasswordStore } from "@/stores/strong-password";
import {
  StrengthOption,
  StrengthOptionLabel,
} from "../domain/password/strength-options";

const RULE_INDICATOR_CLASS = {
  pass: "password-hint__rule--pass",
  fail: "password-hint__rule--fail",
};

describe("App", () => {
  let wrapper;

  const setPasswordTo = (password) => {
    return wrapper.get('[data-test="password-field"]').setValue(password);
  };

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
      },
    });
    useStrongPasswordStore();
  });

  it("should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("rules indicators", () => {
    const NOT_EXCLUSIVE_SPEC_SYMBOLS_LIST = "$%^& _-+*()@!";

    const examples = [
      {
        password: "",
        passedRules: [],
        description: "all rules failed",
      },
      {
        password: "A",
        passedRules: [RULE.OneLetter],
        description: "one character",
      },
      {
        password: "Ab",
        passedRules: [RULE.OneLetter, RULE.UpperAndLower],
        description: "upper and lower char",
      },
      {
        password: "3a33",
        passedRules: [RULE.OneLetter, RULE.OneNumber],
        description: "upper and lower char",
      },
      ...NOT_EXCLUSIVE_SPEC_SYMBOLS_LIST.split("").map((specialChar) => ({
        password: `a${specialChar}p`,
        passedRules: [RULE.SpecialSymbol, RULE.OneLetter],
        description: "special char",
      })),
      {
        password: "aaaa",
        passedRules: [RULE.OneLetter],
        description: "one character",
      },
      {
        password: "aaaae",
        passedRules: [RULE.OneLetter, RULE.LongerThan4],
        description: "longer than 4",
      },
      {
        password: "ab123",
        passedRules: [RULE.OneLetter, RULE.OneNumber, RULE.LongerThan4],
        description: "longer than 4",
      },
      {
        password: "###!!~~)",
        passedRules: [RULE.SpecialSymbol, RULE.LongerThan4],
        description: "longer than 4",
      },
      {
        password: "Gsasfgasa",
        passedRules: [
          RULE.OneLetter,
          RULE.LongerThan4,
          RULE.LongerThan8,
          RULE.UpperAndLower,
        ],
        description: "longer than 8",
      },
      {
        password: "1234567890asd",
        passedRules: [
          RULE.OneLetter,
          RULE.LongerThan4,
          RULE.OneNumber,
          RULE.LongerThan8,
          RULE.LongerThan12,
        ],
        description: "longer than 12",
      },
      {
        password: "#UpperLowerNumb3rLongEnough!",
        passedRules: Object.values(RULE),
        description: "all rules satisfied",
      },
    ];

    it.each(examples)(
      'with password set to "$password" should indicate $description',
      async ({ password, passedRules }) => {
        expect.hasAssertions();
        const failedRules = Object.values(RULE).filter(
          (rule) => !passedRules.includes(rule)
        );

        await setPasswordTo(password);

        passedRules.forEach((rule) => {
          expect(
            wrapper
              .get(`[data-test-rule-indicator="${rule}"]`)
              .classes(RULE_INDICATOR_CLASS.pass)
          ).toBeTruthy();
          expect(
            wrapper
              .get(`[data-test-rule-indicator="${rule}"]`)
              .classes(RULE_INDICATOR_CLASS.fail)
          ).toBeFalsy();
        });

        failedRules.forEach((rule) => {
          expect(
            wrapper
              .get(`[data-test-rule-indicator="${rule}"]`)
              .classes(RULE_INDICATOR_CLASS.fail)
          ).toBeTruthy();
          expect(
            wrapper
              .get(`[data-test-rule-indicator="${rule}"]`)
              .classes(RULE_INDICATOR_CLASS.pass)
          ).toBeFalsy();
        });
      }
    );
  });

  describe("strength validation", () => {
    describe("when less than 5 rules satisfied", () => {
      const examples = ["A", "a", "Aa!", "$", "6a!B"];
      it.each(examples)(
        'should indicate password as weak for input "%s"',
        async (password) => {
          await setPasswordTo(password);
          expect(wrapper.get('[data-test="validation-summary"]').text()).toBe(
            StrengthOptionLabel[StrengthOption.Weak]
          );
        }
      );
    });

    describe("when at least 5 rules satisfied", () => {
      const examples = ["6a!Bd", "hugryj#S3", "EMn1fyStr0ngPa$$word"];
      it.each(examples)(
        'should indicate password as strong for input "%s"',
        async (password) => {
          await setPasswordTo(password);
          expect(wrapper.get('[data-test="validation-summary"]').text()).toBe(
            StrengthOptionLabel[StrengthOption.Strong]
          );
        }
      );
    });
  });
});
