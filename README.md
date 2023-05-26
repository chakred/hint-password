# Strong Password Input Challenge

Within this challenge your objective will be to develop a complete project.

## Briefing
### User Story
AS a new customer

I WANT to have a password input with hints

SO THAT I always define strong password

### Requirement Details
#### Functional
We have the set of checks(rules) for the password:
* Has at least one letter
* Has at least one lower and one upper case letter
* Has at least one number
* Has at least one special character
* Has length > 4
* Has length > 8
* Has length > 12

** Rules that evaluate length are considered individual rules, meaning if you've got a password consisting 13 chars it passes all 3 of them. **

These checks must be displayed next to the input as a hints list.
Based on the entered password the hint list should indicate
which checks from above are passed and which remain to be passed.

There also must be another indicator telling if the entered password
is considered `strong` or `weak` based on the number of individual check passed.

Password is considered as `strong` when `at least 5` rules satisfied.

#### Non functional
* You may define components, project structure and config to your taste
* You can install and use any library you need
* You free to style the project the way you like

#### Screen Layout Example

---
`[ Password Input ]` | _Password is Weak_
* ~~Has at least one letter~~
* ~~Has at least one lower and one upper case letter~~
* Has at least one number
* ~~Has at least one special character~~
* Has length > 4
* Has length > 8
* Has length > 12
---

## What will be evaluated to score the result?
* Code Quality
  * Code is written in reader-friendly manner
  * There is no obvious violations of SOLID principles
  * Absence of Vue and JS anti-patterns
* Components Structure
  * Component naming is clear and unambiguous
  * Components are split so that they only have one responsibility and not strongly coupled
  * Components has predictable inputs and outputs
* Styling and Markup
  * Markup uses elements following their semantics
  * Layout is responsive and mobile friendly
  * CSS is organised well or some naming methodology is used
* Tests
  * All the predefined tests are passed
  * Some new tests are implemented, well structured and not biased

## Hints
* If you don't have experience working with Web IDE and after 5 minutes of trying it you don't feel comfortable working in it, consider fallback to Use local IDE (via Git) and completing it in the local environment you're used to. This description is present README.md so you may keep developing without switching contexts.
* If you felt confused by the challenge content/tool, please note that down in the feedback section so that we may adjust those aspects.
* There are pre-built tests set in src/__tests__/App.spec.js you may use its result to measure if the specification is implemented correctly. But as stated above you're free to change this aspect either and we will evaluate correctness independently of whether your solution passes pre-defined tests or doesn't. For defining your own tests, you may use any other directory(not src/__tests__/**) to place your tests into.
* Challenge can't be paused, but we strongly recommend taking breaks for 5-10 minutes per hour of work. The duration of the challenge increased so that must be enough time to take breaks.
* Dedicate a timebox to review results and perform cleanp before the final submission.

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev --port 8000
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
