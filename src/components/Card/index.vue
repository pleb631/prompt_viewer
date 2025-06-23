<script setup lang="ts" name="Card">
import { ElCard, ElMessage } from "element-plus";
import { defineProps } from "vue";
import { type ImageInfo } from "./types.ts";
defineProps<{
    img_info: ImageInfo;
    displayImg: boolean;
    base_url: string;
    show_img: (item: ImageInfo) => void;
}>();

function copyToClipboard(text: string) {
    if (!text) return;
    navigator.clipboard
        .writeText(text)
        .then(() => {
            ElMessage.success("已复制到剪切板");
        })
        .catch(() => {
            ElMessage.error("复制失败，请手动复制");
        });
}
</script>

<template>
    <el-card>
        <div class="header">{{ img_info.name }}</div>
        <img
            v-if="displayImg && img_info.img_url"
            v-lazy="base_url + img_info.img_url"
            style="width: 100%"
            @click="show_img(img_info)"
        />
        <template #footer
            ><el-button @click="copyToClipboard(img_info.tag)">
                {{ img_info.tag }}
            </el-button>
        </template>
    </el-card>
</template>

<style scoped lang="scss">
.el-card {
    margin: 2px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

}
.header {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
}

img{
    cursor: pointer;
    transition: transform 0.2s;
}
</style>
