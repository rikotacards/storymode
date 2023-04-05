# Post
* A post can either have image(s) or no image(s). 
* A post can either have text
* A post cannot have no image and no text, obviously. 

```ts
// Post schema
{
  postId: '19950224';
  username: 'michaelhsu05';
  timestamp: 'dec 16 1992';
  location: 'San Diego';
  content: ['mediaType01', 'mediaType02']
  reactions: 'reactionStype'
}
```
# content 
```js
// mediaType
{
  parent: '19950224'
  contentId: '01230',
  imageUrl: '',
  caption: 'test'
}
```

# Reactions
```js
{
  contentId: 'mediaId'
  heart: 10,
  sad: 0
}
```
# Image storage path design
`/[env]/[username]/[postId]/[fileName-orderNo]`

# Post db path

## Option 1

`/content/[userid]/posts/[postId]/content`
- This path gets us all images / text content for a specific post
- We would use this path to render a post

* `/content` lowest level
* `/content/[userId]` so we can get all posts from that user, or get all posts from followers
* `/content/[userId]/posts` to get all posts for that userId
* `/content/[userId]/posts/[postId]`, access specific post
* `/content/[userid]/posts/[postId]/content` access list of images or text post

## Option 2
``/content/[userid]/posts/[postId]/`
- Shorter, and we nest all information into postId. The post document would include the list of images / text
- Reactions would be a key, mapped to a map `reactions: {happy: 0, sad: 1}`

# Notifcations
notifcations table
userId
msg: liked, followed, tagged, mentioned
payloadId: 
{s: me (uid), r: you (uid), payloadId: {postId}}