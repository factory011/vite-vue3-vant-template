<script setup>
const props = defineProps(["msg", "test"]);

const count = ref(0);

const myEmit = defineEmits(["change-a"]);

const updataA = () => {
  myEmit("change-a", "adadasdadasd");
};
</script>

<template>
  <h1>{{ props.msg }}</h1>

  <van-button type="primary" @click="updataA">修改父组件message</van-button>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
