<!-- script setup語法糖不需要再寫那些註冊components的步驟與export -->
<script setup>
import { ref, reactive, watch, computed } from "vue"
import TodoItem from "./TodoItem.vue"
import TodoFooter from "./TodoFooter.vue"
import Modal from "./Modal.vue"
import TodoForm from "./TodoForm.vue"
import useModal from "../hooks/useModal.js"
import data from "../assets/todos.js"

const { isOpen, openModal, closeModal } = useModal()

const localTodos = JSON.parse(localStorage.getItem("todos"))

const todos = ref(localTodos != null ? localTodos : data)

const currentTodo = ref(null)
const isNewTodo = ref(null)

// 待完成項目
const todosTbaLength = computed(() => {
    // 返回的也是一個ref
    const length = todos.value.reduce((accumulator, currentValue) => {
        if (!currentValue.done) accumulator++
        return accumulator
    }, 0)
    return length
})

const todosDoneLength = computed(() => todos.value.length - todosTbaLength.value)

// 監聽數據變動<===>react useEffect
watch(
    todos,
    (newValue) => {
        console.log("todos updated", { newValue })
        localStorage.setItem("todos", JSON.stringify(todos.value))
    },
    { deep: true }
)

function onNewTodoOpenModal() {
    isNewTodo.value = true
    openModal()
}

function onUpdTodoOpenModal(todo) {
    currentTodo.value = todo
    isNewTodo.value = false
    openModal()
}

function onTodoFormSubmit(e, data) {
    e.preventDefault()
    console.log("onTodoFormSubmit", { data })

    if (data?.id) {
        updTodo(data)
    } else {
        addTodo(data)
    }

    onTodoCloseModal()
}

function onTodoCloseModal() {
    currentTodo.value = null
    closeModal()
}

function addTodo(todoObj) {
    todos.value.push({ id: crypto.randomUUID(), ...todoObj })
}

function updTodo(todoObj) {
    todos.value = todos.value.map((todo) => {
        if (todo.id === todoObj.id) return todoObj
        return todo
    })
}

function delTodoById(id) {
    // console.log({ id })
    todos.value = todos.value.filter((todo) => todo.id !== id)
}

function delDoneTodo() {
    todos.value = todos.value.filter((todos) => todos.done === false)
}
</script>

<!-- 不用語法糖 
    <script>
    import TodoItem from "./TodoItem.vue"
    export default {
        // ...other options
        components: { TodoItem },
    }
    </script>
-->

<template>
    <div id="todo-container">
        <h3 id="todo-title">TODO</h3>
        <div id="todo-items">
            <TodoItem
                v-for="(todo, index) in todos"
                :todo="todo"
                :key="todo.id"
                :delTodoById="delTodoById"
                :onUpdTodoOpenModal="onUpdTodoOpenModal"
            />
            <TodoFooter
                :todosTbaLength="todosTbaLength"
                :delDoneTodo="delDoneTodo"
                :todosDoneLength="todosDoneLength"
            />
        </div>
        <div id="todo-add" @click="onNewTodoOpenModal">
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        fill-rule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>
    </div>

    <Modal :isOpen="isOpen" :onClose="onTodoCloseModal">
        <TodoForm
            :todo="currentTodo"
            :onTodoFormSubmit="onTodoFormSubmit"
            :title="isNewTodo ? 'ADD TODO' : 'UPDATE TODO'"
            buttonText="saveTask"
        />
    </Modal>
</template>

<style scoped>
#todo-container {
    position: relative;
    width: 600px;
    max-height: 80vh;
    background-color: rgb(254, 254, 254);
    border: 1px solid rgba(239, 238, 244, 0.865);
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

#todo-title {
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

#todo-items {
    overflow-y: auto;
    padding: 16px;
}

#todo-add {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
}

button {
    outline: 0;
    background-color: transparent;
    border: 0;
}
svg {
    cursor: pointer;
    width: 32px;
    height: 32px;
}
</style>
