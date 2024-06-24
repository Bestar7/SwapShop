## What is a store
A store is a centralized place to store and manage application state. It is used to manage data. An exemple would be a parent component has data, and one of it child/grandchild/more needs this data.

Instead of passing the data through the component tree, we can use a store to manage the data, and avoid passing the data througt params.

## Why Pinia
Pinia is a new library for Vue that aims to be a replacement for Vuex. It is designed to be easier to use and more flexible. It is also not tied to Vue, and can be used with any framework or library, unlike Vuex.

## Setup store vs Option Store
While Setup store is more flexible, Option store is easier to use with Server-Side Rendering (SSR), according to pinia's documentation.

## From Setup store to Option store
In Setup Stores:
- ref()s become state properties
- computed()s become getters
- function()s become actions