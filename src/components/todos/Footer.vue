<script setup>
import * as http from "@/apis/todo";
const state = reactive({ completed: [], showCompleted: false });

const props = defineProps({ selFlag: String, count: Number });

watch(
  props,
  async (newProps) => {
    const getCompletedList = await http.getTodoStatusList({
      checked: 1
    });
    state.completed = getCompletedList.data
    state.showCompleted = state.completed.findIndex(v => v.checked === 1)
  },
  { immediate: false, deep: true }
);

console.log(
  "showClearCompleted"
);

const emit = defineEmits([
  "selAll",
  "selActive",
  "selCompleted",
  "clearCompleted",
]);

const selAll = () => {
  emit("selAll", 11);
};
const selActive = () => {
  emit("selActive", 22);
};
const selCompleted = () => {
  emit("selCompleted", 33);
};
const clearCompleted = () => {
  emit("clearCompleted", 44);
};
</script>

<template>
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"
      ><strong>{{ props.count }}</strong> item left</span
    >
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a :class="selFlag === 'all' ? 'selected' : ''" @click="selAll">All</a>
      </li>
      <li>
        <a :class="selFlag === 'active' ? 'selected' : ''" @click="selActive"
          >Active</a
        >
      </li>
      <li>
        <a :class="selFlag === 'all' ? 'completed' : ''" @click="selCompleted"
          >Completed</a
        >
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button
      v-show="state.showCompleted > -1"
      class="clear-completed"
      @click="clearCompleted"
    >
      Clear completed
    </button>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  .todo-count {
    float: left;
    text-align: left;
    strong {
      font-weight: 300;
    }
  }

  .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
    li {
      display: inline;
      a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
      }
      a:hover {
        border-color: rgba(175, 47, 47, 0.1);
      }
      a.selected {
        border-color: rgba(175, 47, 47, 0.2);
      }
    }
  }

  .clear-completed,
  html .clear-completed:active {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
  }

  .clear-completed:hover {
    text-decoration: underline;
  }
}
.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}
@media (max-width: 430px) {
  .footer {
    height: 50px;
  }
  .filters {
    bottom: 10px;
  }
}
</style>
