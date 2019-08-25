<template>
  <div>
    <img src="../../assets/logo.png" width="70px">
    <h1>Vue cli based frontend boilerplate</h1>
  </div>
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style lang="scss" scoped>
@import '../../styles/_stylebase.scss';

h1 {
  color: $color_white;
  margin-top: $size / 2;
  margin-bottom: $size;
  @include text($font-family_sans, $font-size_normal, $font-weight_sans_bold);
}
</style>
