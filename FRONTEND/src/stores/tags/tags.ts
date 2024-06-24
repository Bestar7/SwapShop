import { defineStore } from 'pinia'

interface State {
  AllTags: string[] | [],
  SelectedTags: string[] | [],
}

const useTagsStore = defineStore('tags', {
  state: (): State => ({
    AllTags: [],
    SelectedTags: [],
  }),
  getters: {
    getAllTags: (state) => state.AllTags,
    getSelectedTags: (state) => state.SelectedTags,
  },
  actions: {}
})

export { useTagsStore }