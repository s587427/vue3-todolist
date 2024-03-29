<script setup>
const props = defineProps(["todosTbaLength", "delDoneTodo", "todosDoneLength"])
</script>

<template>
    <div id="todo-footer">
        <div v-if="todosTbaLength">{{ todosTbaLength }} 個待完成項目</div>
        <button v-if="todosDoneLength" @click="delDoneTodo">清除已完成項目</button>
    </div>
</template>

<style scoped>
#todo-footer {
    padding: 12px 20px 0px 20px;
    display: flex;
    justify-content: space-between;
}

button {
    cursor: pointer;
    font-size: 15px;
    color: rgba(133, 133, 159, 0.862);
}
</style>
