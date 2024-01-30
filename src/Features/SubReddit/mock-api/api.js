export const subRedditLinks = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() < 0.1) {
				// 10% chance to reject
				reject(new Error('Failed to load subReddit links'));
			} else {
				resolve([
					{
						title: 'Home',
						id: 0,
						url: '/',
					},
					{
						title: 'SubReddit 1',
						id: 1,
						url: '/posts',
					},
					{
						title: 'SubReddit 2',
						id: 2,
						url: '/posts',
					},
					{
						title: 'SubReddit 3',
						id: 3,
						url: '/posts',
					},
					{
						title: 'SubReddit 4',
						id: 4,
						url: '/posts',
					},
					{
						title: 'SubReddit 5',
						id: 5,
						url: '/posts',
					},
					{
						title: 'SubReddit 6',
						id: 6,
						url: '/posts',
					},
					{
						title: 'SubReddit 7',
						id: 7,
						url: '/posts',
					},
					{
						title: 'SubReddit 8',
						id: 8,
						url: '/haha',
					},
				]);
			}
		}, 1000);
	});
};
