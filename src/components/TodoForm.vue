<script setup>
import { reactive, onMounted } from "vue"
const props = defineProps(["title", "buttonText", "onTodoFormSubmit", "todo"])

const data = reactive({
    title: "",
    description: "",
    date: "",
})

onMounted(() => {
    if (props.todo !== null) {
        Object.entries(props.todo).forEach(([key, value]) => {
            data[key] = value
        })
    }
    console.log("todoForm", { props })
})
</script>

<template>
    <form @submit="onTodoFormSubmit($event, data)">
        <h3>{{ title }}</h3>
        <div class="input-group">
            <!-- <label for="title">標題: </label> -->
            <input id="title" type="text" placeholder="請輸入標題" v-model="data.title" required />
        </div>
        <div class="input-group">
            <!-- <label for="desc">描述: </label> -->
            <textarea
                rows="4"
                id="desc"
                placeholder="請輸入描述"
                v-model="data.description"
                required
            ></textarea>
        </div>
        <div class="input-group">
            <!-- <label for="">日期: </label> -->
            <input type="date" placeholder="請選擇日期" v-model="data.date" required />
        </div>
        <button type="submit">{{ buttonText }}</button>
    </form>
</template>

<style scoped>
h3 {
    text-align: center;
}
input,
textarea {
    padding: 8px;
    border: 1px solid rgb(0, 0, 0, 0.2);
    border-radius: 4px;
    width: 100%;
    outline: none;
    transition: 0.3s;
    font-size: 16px;
}

input:focus,
textarea:focus {
    box-shadow: inset 0 0 0 1px rgb(73, 115, 201);
}

form {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

form label {
    font-weight: 600;
    font-size: 16px;
}

form .input-group {
    display: flex;
    align-items: center;
    gap: 4px;
}

form button {
    align-self: flex-start;
    background-color: rgb(104, 52, 215);
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
}

form button:hover {
    border-radius: 0px;
}
</style>
