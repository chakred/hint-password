import { defineStore } from "pinia";
import { RULE } from "@/domain/password/rules";
import { StrengthOption } from "@/domain/password/strength-options";
import { toRaw } from "vue";

export const useStrongPasswordStore = defineStore('strong_password', {
    /**
     * State
     */
    state: () => ({
        password: '',
        rules: {
            [RULE.SpecialSymbol]: false,
            [RULE.UpperAndLower]: false,
            [RULE.OneNumber]: false,
            [RULE.LongerThan4]: false,
            [RULE.LongerThan8]: false,
            [RULE.LongerThan12]: false,
        },
        isPassStrong: ''
    }),

    /**
     * Getters
     */
    getters: {
        getValidRuleStatus: (state) => {
            return state.isPassStrong;
        },
        
        getHandledRules: (state) => {
            let handledRules = [];
            for (let key in state.rules) {
                if (state.rules.hasOwnProperty(key)) {
                    handledRules.push({
                        name: key,
                        isValid: state.rules[key]
                    })
                }
              }

            return handledRules;
        }
    },

    /**
     * Actions
     */
    actions: {
        fillPassword(value) {
            this.password = value;

            this.checkMinLength();
            this.checkHasLowerAndUppercase();
            this.checkHasNumber();
            this.checkHasSpecial();
            this.checkPassStrength();
        },

        checkMinLength() {
            this.rules[RULE.LongerThan4] = (this.password.length > 4)
            this.rules[RULE.LongerThan8] = (this.password.length > 8)
            this.rules[RULE.LongerThan12] = (this.password.length > 12)
        },

        checkHasLowerAndUppercase() {
            this.rules[RULE.UpperAndLower] = (/[A-Z]/.test(this.password) && /[a-z]/.test(this.password));
        },

        checkHasNumber() {
            this.rules[RULE.OneNumber] = /\d/.test(this.password);
        },

        checkHasSpecial() {
            this.rules[RULE.SpecialSymbol] = /[!@#\$%\^\&*\)\(+=._-]/.test(this.password);
        },

        checkPassStrength() {
            let count = 0;
            const rules = toRaw(this.rules);

            for (let key in rules) {
                if (rules.hasOwnProperty(key) && rules[key] === true) {
                    count++;
                }
            }

            if (count < 1) {
                this.isPassStrong = '';
            } else {
                this.isPassStrong = count >= 4 ? StrengthOption.Strong : StrengthOption.Weak
            }
        }
    },
})