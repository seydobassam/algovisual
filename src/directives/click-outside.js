// FIXME: [bs] I have created an NPM pakage that can be used instead of this 
export const clickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (evt) => {
      evt.stopPropagation();
      if (!(el === evt.target || el.contains(evt.target))) {
        binding.value(evt, el);
      }
    };
    window.requestAnimationFrame(() => {
      document.addEventListener("click", el.clickOutsideEvent);
    });
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};