<template>
    <input  class="edit-input" :style="{border: `1px solid ${inputBorderColor}`}" type="text" :value="value" @input="onInput" @blur="onBlur" @click="onClick" />
</template>
<script setup lang='ts'>
import {defineProps, ref } from 'vue';
    const props = defineProps({
        value: {
            type: String,
            default: () => ''
        },
        setValue: {
            type: Function,
            // eslint-disable-next-line
            default: () => {}
        },
        inputBorderColor: {
            type: String,
            default: 'red'
        }
    });

    const inputValue = ref(props.value);

    function onInput(e: any) {
        inputValue.value = e.target.value.trim();
    }

    function onClick(e:MouseEvent) {
        e.stopPropagation();
    }

    function onBlur() {
        props.setValue(inputValue);
    }

    
</script>
<style scoped lang='scss'>
.edit-input{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid rgb(255, 38, 0);
    outline: 0;
}


</style>