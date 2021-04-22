import App from './App.svelte';

export const mount = (element) => {
  new App({
    target: element,
  });
}
