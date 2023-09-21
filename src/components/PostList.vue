<template>
    <div v-if="posts.length >= 1">
        <h3>Posts list</h3>
        <post-item v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"/>
    </div>
    <h2 v-else style="color:tomato; text-decoration: underline overline;">List is empty</h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
export default {
    components: {
        PostItem
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped></style>