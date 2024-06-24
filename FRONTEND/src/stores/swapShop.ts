import { defineStore } from 'pinia'

interface State {
  swapShop: SwapShop | undefined;
}

const useSwapShopStore = defineStore('swapShop', {
  state: (): State => ({
    swapShop: undefined,
  }),
  getters: {
    getSwapShop: (state:State): SwapShop | undefined => {
      return state.swapShop;
    }
  }
})

export { useSwapShopStore }