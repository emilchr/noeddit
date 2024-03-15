export const subRedditLinks = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() < 0.0001) {
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
						title: 'SubRedditasdasd 1',
						id: 1,
						url: '/posts',
					},
					{
						title: 'SubReddit 2',
						id: 2,
						url: '/posts1',
					},
					{
						title: 'SubRedditwewqe 3',
						id: 3,
						url: '/posts2',
					},
					{
						title: 'SubReddit 4',
						id: 4,
						url: '/posts3',
					},
					{
						title: 'SubRedditqwqw 5',
						id: 5,
						url: '/posts4',
					},
					{
						title: 'SubRedditwwq 6',
						id: 6,
						url: '/posts5',
					},
					{
						title: 'SubReddit 7qweqwe',
						id: 7,
						url: '/posts6',
					},
					{
						title: 'SubReddit 8',
						id: 8,
						url: '/haha',
					},
				]);
			}
		}, 100);
	});
};
