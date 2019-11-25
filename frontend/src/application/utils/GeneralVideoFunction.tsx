/**
 * 
 * @param url string
 * @returns string which represents a youtube video id
 * @description get video id from a well formatted youtube video url
 */
export const getYouTubeVideoId = (url: string) => {
  const urlArray = url.split("/");
  const youTubeVideoId = urlArray[urlArray.length - 1];
  return youTubeVideoId;
}

/**
 * 
 * @param url string
 * @returns url which contains the video's cover image
 * @description get a cover image from a YouTube video by url
 */
export const getVideoTumbnail = (url: string) => {
  const youTubeVideoId = getYouTubeVideoId(url);
  return `https://img.youtube.com/vi/${youTubeVideoId}/0.jpg`;
};
