# Vue cheat Sheet

```vue
<!-- 定義一個SFC -->
<script setup>

    // setup中定義的響應數據/function都可以直接在模板中做使用
    import {ref, reactive, computed, watch, onMounted, onUpdated, onUnmounted, provide, inject} from "vue"
    
    // 定義provide, 所有子組件(包含深層)都可存取
    provide("name", "xxxx")
    // 接收inject
    const {xxx, xxx} = inject("providekey")

    // 接收props
    const props = defineProps(["gender"]) // 而後存取props. props.gender在模板中會被自動解析直接使用gender

    // like useState
    const nickname = ref("sheng") // 任何數據都行
    const person = reactive({name: "sheng", age: 25}) // 返回Proxy對象, 無法接收原始數據如string, boolean, ...只能array object...
    const number = ref(1)

    // 計算
    const numberPlusOne = computed(()=> number.value + 1)

    function updateNickName(nickName){
        // 在setup中ref必須透過.value來存取值
        nickname.value = nickName
    }
    
    // 監聽 like useEffect
    watch(
        number, 
        (newVal, oldVal) => {
            // newVal === oldVal, (同一個對象)參考地址相同
        },
        {deep:true} // 可選
    )

    // 生命鉤子
    onMounted(() => {
        console.log("onMounted")
    })

    onUpdated(()=>{
       console.log("dom被重新解析後調用")
    })

    onUnmounted(()=>{
         console.log("onUnmounted")
    })

</script>

<template>
    <!-- 在模板中ref的value會被自動解析, props也會自動脫一層 -->
    {{nickname}}
    {{gender}}-{{person.name}}-{{person.age}}
    {{number}}-{{numberPlusOne}}
</template>

<style scoped></style>

```


