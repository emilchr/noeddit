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
  const todaysTime = new Date();

  const timeElapsed = todaysTime - postedTime;

  const years = timeElapsed / (1000 * 60 * 60 * 24 * 7 * 52);
  const months = timeElapsed / (1000 * 60 * 60 * 24 * 7 * 4.3);
  const weeks = Math.floor(timeElapsed / (1000 * 60 * 60 * 24 * 7));
  const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor(timeElapsed / (1000 * 60 * 60));
  const minutes = Math.floor(timeElapsed / (1000 * 60));
  const seconds = Math.floor(timeElapsed / 1000);
  let timeSincePost = null;
  if (years > 1) {
    timeSincePost = `${Math.floor(years)} year${Math.floor(years) > 1 ? 's' : ''} ago`;
  } else if (weeks > 4.3) {
    timeSincePost = `${Math.floor(months)} month${Math.floor(months) > 1 ? 's' : ''} ago`;
  } else if (days > 7) {
    timeSincePost = `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (hours > 24) {
    timeSincePost = `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (minutes > 60) {
    timeSincePost = `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (seconds > 60) {
    timeSincePost = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    timeSincePost = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }

  return timeSincePost;
};

// truncates strings
export const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
};
