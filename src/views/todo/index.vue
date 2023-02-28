<script setup>
import * as http from "@/apis/todo";

const state = reactive({ enter: "", selFlag: "all", count: 0 });

let todo = reactive({ list: [] });

onMounted(async () => {
  queryList();
});

watch(
  todo,
  async (newReactive) => {
    console.log("watch", newReactive);
    const getActiveList = await http.getTodoStatusList({
      checked: 0
    });
    state.count = getActiveList.data.length
  },
  { immediate: false, deep: true }
);

const queryList = async () => {
  const getTodoList = await http.getTodoList();
  todo.list = getTodoList.data;
};

const keyDown = async (value) => {
  console.log("keyDown", value);
  if (value) {
    await http.addTodoItem({
      label: value,
      checked: 0,
    });
    queryList();
    state.enter = "";
  }
};

const onChangeEnter = (value) => {
  state.enter = value;
  console.log("onChangeEnter", value);
};

const onChangeCheckedAll = async (checked) => {
  console.log("onChangeCheckedAll", checked);
  await http.updateTodoStatus({
    checked: checked ? 1 : 0,
  });
  queryList();
};

const onChangeChecked = async (item) => {
  item.checked = !item.checked;
  await http.updateTodoItem({
    label: item.label,
    checked: item.checked ? 1 : 0,
    rowId: item.rowId,
  });
  queryList();
  console.log("onChangeChecked", item);
};

const destroy = async (rowId) => {
  console.log("destroy", rowId);
  await http.deleteTodoItem({
    rowId: rowId,
  });
  queryList();
  // todo.list.splice(
  //   todo.list.findIndex((v) => v.rowId === rowId),
  //   1
  // );
};

const selAll = () => {
  console.log("all");
  state.selFlag = "all";
  queryList();
};

const selActive = async () => {
  console.log("active");
  state.selFlag = "active";
  const getActiveList = await http.getTodoStatusList({
    checked: 0,
  });
  todo.list = getActiveList.data;
};

const selCompleted = async () => {
  console.log("completed");
  state.selFlag = "completed";
  const getCompletedList = await http.getTodoStatusList({
    checked: 1,
  });
  todo.list = getCompletedList.data;
};

const clearCompleted = async () => {
  console.log("clearCompleted");
  const needDels = todo.list.filter((item) => item.checked).map(obj => {return obj.rowId}).join(',');
  await http.deleteTodoItem({
    rowId: needDels,
  });
  queryList();
};
</script>

<template>
  <div>
    <section class="todoapp">
      <Header
        :enter="state.enter"
        @keyDown="keyDown"
        @onChangeEnter="onChangeEnter"
      ></Header>
      <Content
        :list="todo.list"
        @onChangeChecked="onChangeChecked"
        @destroy="destroy"
        @onChangeCheckedAll="onChangeCheckedAll"
      ></Content>
      <Footer
        :selFlag="state.selFlag"
        :count="state.count"
        @selAll="selAll"
        @selActive="selActive"
        @selCompleted="selCompleted"
        @clearCompleted="clearCompleted"
      ></Footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Written by <a>yuxiaole</a></p>
      <p>Part of <a>TodoMVC</a></p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.todoapp {
  background: #fff;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
.info {
  margin: 65px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
  p {
    line-height: 1;
  }
  a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }
  a:hover {
    text-decoration: underline;
  }
}
</style>
