<script setup>
import { inject } from "vue"
const { person, updatePerson } = inject("personProvide")

console.log({ person, updatePerson })
</script>

<template></template>
