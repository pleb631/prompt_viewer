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

    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(text)
            .then(() => {
                ElMessage.success("已复制到剪切板");
            })
            .catch((err) => {
                console.error("clipboard.writeText 失败:", err);
                fallbackCopyText(text);
            });
    } else {
        console.warn("clipboard API 不可用，使用 fallback");
        fallbackCopyText(text);
    }
}

function fallbackCopyText(text: string) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        const successful = document.execCommand("copy");
        if (successful) {
            ElMessage.success("已复制到剪切板");
        } else {
            ElMessage.error("复制失败，请手动复制");
        }
    } catch (err) {
        console.error("fallback 复制失败:", err);
        ElMessage.error("复制失败，请手动复制");
    }

    document.body.removeChild(textarea);
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
            ><el-button
                class="btn"
                @click="copyToClipboard(img_info.tag)"
                :title="img_info.tag"
            >
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

img {
    cursor: pointer;
    transition: transform 0.2s;
}
</style>
