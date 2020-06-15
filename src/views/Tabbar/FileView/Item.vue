<template>
  <van-cell clickable>{{ index }} - {{ source.text }}</van-cell>
</template>

<script>
export default {
  name: "item-component",
  props: {
    index: {
      // index of current item
      type: Number
    },
    source: {
      // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>