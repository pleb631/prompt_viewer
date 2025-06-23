<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { type ImageInfo, Group, GroupProp } from "@/components/Card/types.ts";
import { ref, onMounted } from "vue";

const columns = ref(4);
const watch_img = ref(true);

const datas = ref<GroupProp>({});

const base_url = "https://huggingface.co/datasets/pleb631/prompt/resolve/main/";
const group_names = ref<string[]>([]);
const group_name = ref("");
const group = ref<GroupProp>({
    name: "",
    groups: [],
});
const sub_group_names = ref<string[]>([]);
const sub_group_name = ref("");
const sub_group = ref<Group>({
    name: "",
    tags: [],
});

const imgViewerVisible = ref(false);

function changeGroup(cat: string) {
    group_name.value = cat;
    group.value = datas.value.find((item: GroupProp) => item.name === cat);
    sub_group_names.value = group.value.groups.map((item: Group) => item.name);
    sub_group_name.value = sub_group_names.value[0];
    sub_group.value = group.value.groups.find(
        (item: Group) => item.name === sub_group_name.value
    );
}

function changeSubGroup(cat: string) {
    sub_group_name.value = cat;

    sub_group.value = group.value.groups.find(
        (item: Group) => item.name === cat
    );
}

onMounted(async () => {
    const res = await fetch(`${base_url}prompt_tags.json`);
    datas.value = await res.json();

    group_names.value = datas.value.map((item: GroupProp) => item.name);
    group_name.value = group_names.value[0];
    group.value = datas.value.find(
        (item: GroupProp) => item.name === group_name.value
    );

    sub_group_names.value = group.value.groups.map((item: Group) => item.name);
    sub_group_name.value = sub_group_names.value[0];
    sub_group.value = group.value.groups.find(
        (item: Group) => item.name === sub_group_name.value
    );
});

const img_info = ref<ImageInfo>({
    img_url: "",
    name: "",
    tag: "",
});
function showImg(item: ImageInfo) {
    img_info.value = item;
    imgViewerVisible.value = true;
}

function cancel() {
    imgViewerVisible.value = false;
}
</script>

<template>
    <div class="responsive-layout">
        <!-- aside 放在上方，小屏时显示为顶部 -->
        <el-card class="aside-card">
            <div class="my-2 group">
                <el-radio-group v-model="group_name">
                    <el-radio-button
                        v-for="cat in group_names"
                        :key="cat"
                        :value="cat"
                        @change="changeGroup(cat)"
                    >
                        {{ cat }}
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div class="my-2 group">
                <el-radio-group v-model="sub_group_name">
                    <el-radio-button
                        v-for="cat in sub_group_names"
                        :key="cat"
                        :value="cat"
                        @change="changeSubGroup(cat)"
                    >
                        {{ cat }}
                    </el-radio-button>
                </el-radio-group>
            </div>
        </el-card>

        <!-- 主内容区域 -->
        <el-card class="main-card">
            <div class="toolbar">
                <el-switch
                    v-model="watch_img"
                    active-text="Open"
                    inactive-text="Close"
                />
                <el-slider
                    v-model="columns"
                    :min="1"
                    :max="6"
                    :step="1"
                    show-input
                    style="max-width: 300px; margin: 10px 0"
                />
            </div>

            <el-row :gutter="20">
                <el-col
                    v-for="(item, index) in sub_group.tags"
                    :key="index"
                    :xs="24"
                    :sm="Math.min(24, Math.ceil(24 / columns))"
                    :md="Math.ceil(24 / columns)"
                >
                    <Card
                        :img_info="item"
                        :base_url="base_url + 'small/'"
                        :display-img="watch_img"
                        :show_img="showImg"
                    />
                </el-col>
            </el-row>
        </el-card>
    </div>

    <el-dialog
        v-model="imgViewerVisible"
        title="高清预览"
        @closed="cancel"
    >
        <img
            :src="base_url + 'regular/' + img_info.img_url + '?t=' + Date.now()"
            style="width: 100%"
        />
    </el-dialog>
</template>

<style scoped lang="scss">
.responsive-layout {
    display: flex;
    flex-direction: row;
    gap: 20px;
    height: 100vh;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
}

/* 卡片全宽高填满容器 */
.aside-card {
    flex: 0 0 auto; /* 不强制拉伸 */
    width: 260px; /* 默认宽度 */
    max-width: 300px; /* 最大宽度限制 */
    overflow-y: auto;
}

.main-card {
    flex: 1 1 auto; /* 占满剩余空间 */
    min-width: 0; /* 避免溢出 */
    overflow-y: auto;

}

.group {
    height: 40%;
    border: 1px solid black;
    margin-bottom: 0.5rem;
    overflow: auto;
    box-sizing: border-box;
}

/* 小屏幕时切换为上下布局 */
@media (max-width: 768px) {
    .responsive-layout {
        flex-direction: column;
        height: auto;
        box-sizing: border-box;
    }

    .aside-card {
        width: 100vw;
        flex-basis: auto;
        flex: unset;
        max-width: unset;
    }

    .main-card {
        overflow: visible;
        height: auto;
        box-sizing: border-box;
    }
}
</style>
