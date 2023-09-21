<template>
    <div class="app">
        <h1>Page with posts</h1>
        <div class="app__btns">
            <my-button @click="showDialog">Create post</my-button>
            <my-select />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list :posts="posts" @remove="removePost" v-if="!isPostLoading" />
        <div v-else><img src="./assets/img/loading.gif"></div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
// import MySelect from "@/components/UI/MySelect";

import axios from "axios";

export default {
    components: {
        PostList,
        PostForm,
        MyButton,
        // MySelect
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: ''
        }
    },
    methods: {
        createPost(post) {
            if (post.title != 0 && post.body != 0) {
                this.posts.push(post);
                this.dialogVisible = false;
            }
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
                this.posts = response.data;
            } catch (error) {
                alert("Some error!!!");
            } finally {
                this.isPostLoading = false;
            }
        }
    },
    mounted() {
        this.fetchPosts();
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app {
    padding: 20px;
    max-width: 500px;
    margin: auto;
}

.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}
</style>