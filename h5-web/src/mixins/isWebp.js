export default {
  computed: {
    isWebp() {
      return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    },
  }
}
