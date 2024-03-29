<script setup>
import { provide, ref } from "vue"
import TodoList from "./components/TodoList.vue"

const person = ref({ name: "sheng", age: 25 })

function updatePerson(person) {
    person.value = person
}

provide("personProvide", {
    person,
    updatePerson,
})
</script>

<template>
    <TodoList />
</template>

<style></style>
