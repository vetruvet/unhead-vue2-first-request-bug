<script setup>
    import { useHead } from '@unhead/vue'

    useHead({
      title: 'hello world',
      script: [
        {
          type: 'application/json',
          innerHTML: { dangerous: '<' + '/script>' }
        }
      ]
    });
</script>

<template>
    <div>hello world</div>
</template>
