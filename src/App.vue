<template>
    <div class="app">
        <post-form @create="createPost" />
        <post-list :posts="posts" @remove="removePost" />
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default {
    components: {
        PostList,
        PostForm
    },
    data() {
        return {
            posts: [
                { id: 1, title: 'Post 1 about Voe!', body: 'This example Vue project!' },
                { id: 2, title: 'Post 2 about Voe!', body: 'This example Vue project!' },
                { id: 3, title: 'Post 3 about Voe!', body: 'This example Vue project!' }
            ],
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        }
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
}
</style>