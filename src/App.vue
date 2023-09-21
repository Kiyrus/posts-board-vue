<template>
    <div class="app">
        <h1>Page with posts</h1>
        <my-button @click="showDialog" style="margin: 15px 0;">Create post</my-button>
        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </my-dialog>
        <post-list :posts="posts" @remove="removePost" v-if="!isPostLoading" />
        <div v-else><img src="./assets/img/loading.gif"> </div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import axios from "axios";

export default {
    components: {
        PostList,
        PostForm
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false
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
                setTimeout(async () => {
                    const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
                    this.posts = response.data;
                    this.isPostLoading = false;
                }, 1000);
            } catch (error) {
                alert("Some error!!!");
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
</style>