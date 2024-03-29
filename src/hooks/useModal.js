import { ref, onMounted, onUnmounted } from "vue"

export default function useModal() {
    onMounted(() => {
        console.log("Modal onMounted")
    })

    onUnmounted(() => {
        console.log("Modal onUnmounted")
    })
    const isOpen = ref(false)

    function openModal() {
        isOpen.value = true
    }
    function closeModal() {
        isOpen.value = false
    }

    return {
        isOpen,
        openModal,
        closeModal,
    }
}
