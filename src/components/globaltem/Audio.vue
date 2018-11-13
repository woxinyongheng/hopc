<template>
    <div class="audio">
        <audio :src="audiourl" controls="controls"></audio>
    </div>
</template>

<script>
    export default {
        name: "Audio",
        props:['audiourl']
    }
</script>

<style scoped lang="scss">

</style>