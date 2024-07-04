// Cleans up urls for media
export const cleanUrl = (imgUrl) => {
	let encoded = imgUrl.replace('amp;s', 's');
	let doubleEncoded = encoded.replace('amp;', '');
	let tripleEncoded = doubleEncoded.replace('amp;', '');
	let quadEncoded = tripleEncoded.replace('amp;v', 'v');
	return quadEncoded;
};
