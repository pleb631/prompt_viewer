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
    <el-container>
        <el-main class="main">
            <el-card style="width: 100%; height: 100%">
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
                    style="width: 300px; margin-bottom: 20px"
                >
                </el-slider>
                <el-row :gutter="20">
                    <el-col
                        :span="Math.ceil(24 / columns)"
                        v-for="(item, index) in sub_group.tags"
                        :key="index"
                    >
                        <Card
                            :img_info="item"
                            :base_url="base_url + 'small/'"
                            :display-img="watch_img"
                            :show_img="showImg"
                        ></Card>
                    </el-col>
                </el-row> </el-card
        ></el-main>
        <el-aside class="right">
            ><el-card style="width: 100%; height: 100%">
                <div class="my-2 ml-4 group">
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
                <div class="my-2 ml-4 group">
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
            </el-card></el-aside
        >
    </el-container>

    <el-dialog
        v-model="imgViewerVisible"
        title="高清预览"
        @closed="cancel"
    >
        <img
            :src="
                base_url +
                'regular/' +
                img_info.img_url +
                '?t=' +
                Date.now()
            "
            style="width: 100%"
        />
    </el-dialog>
</template>

<style scoped lang="scss">
.main {
    padding: 20px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 80vw;
    .el-card {
        overflow: auto;
    }
}
.right {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f5f5f5;
    width: 20vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
}

.group {
    height: 40%;
    border: 1px solid black;
    margin-bottom: 0.5rem;
    overflow: auto;
}
</style>
