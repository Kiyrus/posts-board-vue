<template>
	<div v-if="posts.length >= 1">
		<h3>Posts list</h3>
		<transition-group name="post-list">
			<post-item
				v-for="post in posts"
				:key="post.id"
				:post="post"
				@remove="$emit('remove', post)"
			/>
		</transition-group>
	</div>
	<h2 v-else style="color: tomato; text-decoration: underline overline">
		List is empty
	</h2>
</template>

<script>
import PostItem from '@/components/PostItem.vue';

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
};
</script>

<style scoped>
.post-list-item {
	display: inline-block;
	margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
	transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
	opacity: 0;
	transform: translateX(130px);
}

.post-list-move {
	transition: transform 0.3s ease;
}
</style>