<template>
  <div class="logo">
    <img src="../assets/logo.png" width="70px">
    <h1 class="logo__header">Vue cli based frontend boilerplate</h1>
  </div>
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style lang="scss" scoped>
@import '../styles/_stylebase.scss';

.logo {

  &__header {
    font-size: 28px;
    color: $color_white;

    @include xs {
      font-size: 24px;
    }
  }
}
</style>
