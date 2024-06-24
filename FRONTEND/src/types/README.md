# What is this folder
This folder contains type definition (used by Typescript)

## import/export in .ts
using the keyword import/export in a .ts file will make it a module, thus NOT 'magically' available to other files without using 'import'.

The aformentioned is called 'ambient module', i think

### vite-env.d.ts
definition for using .env properties (like VITE_PORT)