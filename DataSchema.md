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
`/[env]/[username]/[postId]/[fileName]`

# Post db path
`/`