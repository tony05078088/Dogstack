<template>
  <div class="EntireComment">
    <div class="fullName">
      CustomerName: {{ comment.first }} {{ comment.last }}
    </div>
    <div class="description">Description: {{ comment.desc }}</div>
    <div class="stars">stars: {{ transformIntoStars }}</div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
  data() {
    return {
      stars: null
    };
  },
  computed: {
    transformIntoStars() {
      let star = "";
      const starAccumulator = "★";
      let calElement = 0;
      for (let i = 0; i < this.comment.stars; i++) {
        if (calElement < this.comment.stars) {
          calElement += 1;
          star += starAccumulator;
          console.log(star);
          console.log(calElement);
        }
      }
      return star;
    }
  }
};
</script>

<style lang="scss" scoped>
.EntireComment {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  .fullName {
    font-size: 1.5rem;
    color: red;
  }
}
</style>
