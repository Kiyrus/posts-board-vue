<template>
	<div class="app">
		<h1>Page with posts</h1>
		<my-input v-model="searchQuery" v-focus placeholder="Search..." />
		<div class="app__btns">
			<my-button @click="showDialog">Create post</my-button>
			<my-select v-model="selectedSort" :options="sortOptions" />
		</div>
		<my-dialog v-model:show="dialogVisible">
			<post-form @create="createPost" />
		</my-dialog>
		<post-list
			v-if="!isPostLoading"
			:posts="sortedAndSearchedPosts"
			@remove="removePost"
		/>
		<div v-else><img src="@/assets/img/loading.gif" /></div>
		<div v-intersection="loadMorePosts" class="observer"></div>
		<!-- <div class="page__wrapper">
				<div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
						'current-page': page === pageNumber
				}" @click="changePage(pageNumber)"> {{ pageNumber }} </div>
		</div> -->
	</div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import MyButton from '@/components/UI/MyButton';
import MySelect from '@/components/UI/MySelect';

import axios from 'axios';
import MyDialog from '@/components/UI/MyDialog.vue';
import MyInput from '@/components/UI/MyInput.vue';

export default {
	components: {
		MyInput,
		MyDialog,
		PostList,
		PostForm,
		MyButton,
		MySelect
	},
	data() {
		return {
			posts: [],
			dialogVisible: false,
			isPostLoading: false,
			selectedSort: '',
			searchQuery: '',
			page: 1,
			limit: 10,
			totalPages: 0,
			sortOptions: [
				{ value: 'title', name: 'Title' },
				{ value: 'body', name: 'Body' }
			]
		};
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
		// changePage(pageNumber) {
		//     this.page = pageNumber;
		// },
		async fetchPosts() {
			try {
				this.isPostLoading = true;
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts',
					{
						params: {
							_page: this.page,
							_limit: this.limit
						}
					}
				);
				this.totalPages = Math.ceil(
					response.headers['x-total-count'] / this.limit
				);
				this.posts = response.data;
			} catch (error) {
				alert('Some error!!!');
			} finally {
				this.isPostLoading = false;
			}
		},
		async loadMorePosts() {
			try {
				this.page += 1;
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts',
					{
						params: {
							_page: this.page,
							_limit: this.limit
						}
					}
				);
				this.totalPages = Math.ceil(
					response.headers['x-total-count'] / this.limit
				);
				this.posts = [...this.posts, ...response.data];
			} catch (error) {
				alert('Some error!!!');
			}
		}
	},
	mounted() {
		this.fetchPosts();
	},
	computed: {
		sortedPosts() {
			return [...this.posts].sort((post1, post2) =>
				post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
			);
		},
		sortedAndSearchedPosts() {
			return this.sortedPosts.filter(post =>
				post.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase())
			);
		}
	}
	// watch: {
	//     page() {
	//         this.fetchPosts();
	//     }
	// }
};
</script>

<style>
.app__btns {
	margin: 15px 0;
	display: flex;
	justify-content: space-between;
}

.page__wrapper {
	display: flex;
	margin-top: 15px;
}

.page {
	border: 1px solid black;
	padding: 10px;
	margin-right: 16.5px;
}

.current-page {
	border: 2px solid teal;
}
</style>