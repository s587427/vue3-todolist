<!-- SFC(單文組件)可以這樣寫, 寫組合式API不用自己return -->
<script setup>
// 定義接受props
const props = defineProps(["todo", "delTodoById", "onUpdTodoOpenModal"])
// console.log("TodoItem", { props })
</script>

<template>
    <div class="todo-item">
        <div class="todo-done">
            <input :id="`todo-${todo.id}`" type="checkbox" v-model="todo.done" />
            <label :for="`todo-${todo.id}`" class="info-title"></label>
        </div>

        <div class="todo-info">
            <label :for="`todo-${todo.id}`" class="info-title">{{ todo.title }}</label>
            <div class="info-description">{{ todo.description }}</div>
            <div class="info-date">{{ todo.date }}</div>
        </div>

        <div class="todo-function">
            <button type="button" @click="onUpdTodoOpenModal(todo)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                </svg>
            </button>

            <button type="button" @click="delTodoById(todo.id)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
.todo-done {
    padding: 0px 8px;
    flex-basis: 10%;
}

.todo-done label {
    display: block;
    position: relative;
    width: 20px;
    height: 20px;
    background-color: white;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    cursor: pointer;
    margin-top: 1.5px;
}

input[type="checkbox"]:checked + label::after {
    /* padding: 1px; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "";
    width: 14px;
    height: 14px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
}

input[type="checkbox"] {
    display: none;
}

.todo-item:first {
    margin-top: -12px;
}

.todo-item {
    display: flex;
    column-gap: 8px;
    padding: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition: 0.3s;
}

.todo-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.todo-info {
    color: rgb(133, 133, 159);
    flex-basis: 100%;
}

.info-title {
    font-weight: bolder;
    color: black;
}
.info-title,
.info-description {
    margin-bottom: 2px;
}
.info-description,
.info-date {
    font-size: 14px;
}

.todo-function {
    flex-basis: 10%;
    display: flex;
    align-items: center;
    column-gap: 8px;
}
</style>
