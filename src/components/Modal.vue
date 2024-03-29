<script setup>
const props = defineProps(["isOpen", "onClose"])
// console.log("Modal", { props })
</script>

<template>
    <div v-if="isOpen">
        <div class="mask"></div>
        <div class="modal">
            <button id="modal-close" @click="onClose">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<style>
.mask {
    inset: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
}
.modal {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 650px;
    transform: translate(-50%, -50%);
    padding: 32px;
    background: white;
    border: 1px solid rgba(239, 238, 244, 0.865);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.modal #modal-close {
    position: absolute;
    top: 1px;
    right: 1px;
}
.modal #modal-close svg {
    width: 24px;
}
</style>
