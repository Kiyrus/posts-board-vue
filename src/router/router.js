import Main from '@/pages/Main';
import { createRouter, createWebHashHistory } from 'vue-router';
import PostPage from '@/pages/PostPage'
import PostPageId from '@/pages/PostPageId'

const routes = [
	{
		path: '/',
		component: Main
	},
	{
		path: '/posts',
		component: PostPage
	},
	{
		path: '/posts/:id',
		component: PostPageId
	}
];

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
});

export default router;