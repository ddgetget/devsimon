<template>
    <div class='container'>
        <div class="grid-container">
            <div class="item merged-row">1</div>

            <div class="item merged-col">2</div>
            <div class="item merged-col">3</div>
            <div class="item merged-row">4</div>

            <div class="item">5</div>
            <div class="item">6</div>
            <div class="item">7</div>
            <div class="item">8</div>
        </div>


    </div>
</template>
<script setup lang='ts'>

</script>
<style lang='scss' scoped>
.container {

    border-radius: 5px;
}

.grid-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 10px;

    .merged-row {
        grid-row: span 2;
    }

    .merged-col {
        grid-column: span 2;
    }

    .item {
        background-color: #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        min-height: 140px;
    }
}
</style>
