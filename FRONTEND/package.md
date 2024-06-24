# What is in package.json ?
Many dependencies, but do we even use them ? What do they do **in this project** ?

## Content
- Dependencies
- DevDependencies
- Others ???

## Dependencies
#### @vueform/multiselect
Adds a lot of stuff for forms (like drag&drop). Awesome for basic usage, absolute NIGHTMARE for for very advanced usage.
#### axios
Facilitate query to the backend (POST, GET, ...)
#### chart.js
Used to display charts (need to be adapted with vue-chartjs)
#### dotenv
import key-value from .env file. Vite can also do that, but not in vite.config.ts (where we set port)
#### pinia
The store used in this project. A store, well, store a value to be used between files and pages.
A store doesn't persist between session.
#### sass
Used by tailwind. It allows to write CSS in a more readable way.
#### vue
The framework used here
#### vue-chartjs
Adapt chart.js to vue
#### vue-i18n
Used for frontend translations
#### vue-router
The router used to automatically navigate from one page (view) to another

## DevDependencies
#### @headlessui/vue
UI components for vue (Menu, Menu Item, ...)
#### @heroicons/vue
Icons for vue
#### tailwindcss
Build CSS with classes inside the HTML.
#### postcss
Needed by tailwind
#### autoprefixer
Needed by tailwind
#### typescript
Java for those who use JS. Add types to your variables, functions ...
#### vite
The bundler used here. It as a '+-compiles' to vanilla JS, that can run on grandma's computer
#### @vitejs/plugin-vue
This plugin allow Vite to work with Vue 3
#### vue-tsc
To combine Vue and TypeScript

## @types/...
Used to define Typescript types for some libraries, which facilitate intellisense (or other autocomplete tool) usage, as well as remove some IDE error

## Others
Nothing so far...