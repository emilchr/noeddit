// Cleans up urls for media
export const cleanUrl = (imgUrl) => {
	let encoded = imgUrl.replace('amp;s', 's');
	let doubleEncoded = encoded.replace('amp;', '');
	let tripleEncoded = doubleEncoded.replace('amp;', '');
	let quadEncoded = tripleEncoded.replace('amp;v', 'v');
	return quadEncoded;
};
// Time of posting
export const postCreated = (postCreated) => {
	const postedTime = new Date(postCreated * 1000); // get time for when post is created.
	const epochTime = new Date(new Date().getTime() / 1000);

	const timeAgo = '';

	return postedTime.toLocaleString('no-NO');
};

// truncates strings
export const truncateString = (str, num) => {
	if (str.length > num) {
		return str.slice(0, num) + '...';
	} else {
		return str;
	}
};
