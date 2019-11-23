/**
 * 
 * @param url string
 * @returns url which contains the video's cover image
 * @description get a cover image from a YouTube video by url
 */
export const getVideoTumbnail = (url: string) => {
  const urlArray = url.split("/");
  const youTubeVideoId = urlArray[urlArray.length - 1];
  return `https://img.youtube.com/vi/${youTubeVideoId}/0.jpg`;
};
