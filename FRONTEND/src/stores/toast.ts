import { defineStore } from 'pinia'

enum msgType {
  SUCCESS = "success",
  ERROR = "error",
}

interface State {
  isVisible: boolean;
  success: string;
  error: string;
  msgTypeNow:msgType;
}

const useToastStore = defineStore('toast', {
  state: (): State => ({
    isVisible: false,
    success: "",
    error: "",
    msgTypeNow: msgType.SUCCESS,
  }),
  getters: {
    getMsgType: (state) => {
      return state.msgTypeNow;
    },
    getMessage: (state) => {
      if (state.msgTypeNow === msgType.ERROR)
        return state.error;
      else if (state.msgTypeNow === msgType.SUCCESS)
        return state.success;
      else
        return "";
    }
  },
  actions: {
    setSuccess(message: string) {
      this.msgTypeNow = msgType.SUCCESS;
      this.success
      this.success = message;
      this.__setTimedVisible(2000);
    },
    setError(message: string) {
      this.msgTypeNow = msgType.ERROR;
      this.error = "";
      this.error = message;
      this.__setTimedVisible();
    },
    __setTimedVisible(ms: number = msVisibleToast) {
      this.isVisible = true;
      visibilityTime(() => {
        this.isVisible = false;
      }, ms);
    },

  }
});

const msVisibleToast = 7*1000; //7 seconds
let timeout: NodeJS.Timeout;
const visibilityTime = (func: ()=>void, ms:number) => {
  clearTimeout(timeout);
  timeout = setTimeout(()=>func(), ms);
}

export { useToastStore, msgType }