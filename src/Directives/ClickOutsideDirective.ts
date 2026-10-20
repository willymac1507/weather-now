interface ClickOutsideBinding {
  value: (event: MouseEvent) => void
}

interface ClickOutsideElement extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void
}

export default {
  beforeMount(el: ClickOutsideElement, binding: ClickOutsideBinding): void {
    el.clickOutsideEvent = function (event: MouseEvent): void {
      // Check if the clicked element is neither the element
      // to which the directive is applied nor its child
      const target = event.target as Node | null
      if (!(el === target || (target !== null && el.contains(target)))) {
        // Invoke the provided method
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: ClickOutsideElement): void {
    // Remove the event listener when the bound element is unmounted
    if (el.clickOutsideEvent) {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  },
}
