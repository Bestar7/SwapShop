import { defineStore } from 'pinia'
import { UserRole } from '~/utils/user';

interface State {
  token?: string;
  me?: User;
}

const useUsersStore = defineStore('users', {
  state: (): State => ({
    token: undefined,
    me: undefined,
  }),
  actions: {
    setAuth(credentials: Credentials): void {
      this.$state.token = credentials.token;
      this.$state.me = credentials.user;
      sessionStorage.setItem('me', JSON.stringify(credentials.user)); // TODO choose one or the other
      localStorage.setItem('me', JSON.stringify(credentials.user));
      sessionStorage.setItem('token', credentials.token);
    },
    isConnected(): boolean {
      return !!this.getToken();
    },
    getMe(): User | null {
      if (this.$state.me) return this.$state.me;
      else if (sessionStorage.getItem('me')) return JSON.parse(sessionStorage.getItem('me')!);
      else return JSON.parse(localStorage.getItem('me')!);
    },
    getToken(): string | null{
      if (this.$state.token) return this.$state.token;
      else return sessionStorage.getItem('token');
    },
    allowedRole(roles: string[]): boolean{
      return roles.includes(this.getMe()?.role ?? UserRole.NONE);
    },
    logout(): void{
      this.$state.token = undefined;
      this.$state.me = undefined;
      sessionStorage.removeItem('me');
      localStorage  .removeItem('me');
      sessionStorage.removeItem('token');
      localStorage  .removeItem('token');
    },
  }
})

export { useUsersStore }