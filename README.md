# Key features
* React with multiple emojis
* Swipe photo and caption
* Native Link in bio
* Clickable links in caption
* Text only post
* Photo groups

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Setting up Firebase
https://www.section.io/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/

## Firebase authentication
https://blog.logrocket.com/implementing-authentication-in-next-js-with-firebase/

## Different envs for firebase
https://stackoverflow.com/questions/37450439/separate-dev-and-prod-firebase-environment


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


# Add post functionality
1. Upload image, be able to select multiple
2. Add caption

## Flow
1. generate a postID already if possible
2. If image uploaded, first is the order. 

# Resources
* Different envs for firestore https://medium.com/@alifyandra/how-i-separate-development-environments-on-firestore-cf512a6afb7b
* Upload images via react and web api
https://stackoverflow.com/questions/43692479/how-to-upload-an-image-in-react-js
* Create Draggable elements 
https://rootstack.com/en/blog/how-do-i-use-drag-and-drop-react
* Implementing next and firebase
https://blog.logrocket.com/implementing-authentication-in-next-js-with-firebase/
* INtro to NextJs / Typescript firebase database
https://www.section.io/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/
* Cropping images
https://www.npmjs.com/package/react-image-crop
* SliderJs mobile device
https://stackoverflow.com/questions/73767963/slider-skipped-in-the-mobile-device
* SwiperJs demos
https://swiperjs.com/demos#pagination
* instagram css grid
https://codepen.io/MAB015/pen/pZjYbX
* Css crop image to square, responsive
https://stackoverflow.com/questions/15167545/how-to-crop-a-rectangular-image-into-a-square-with-css
* Protected page route
https://shipsaas.com/blog/create-protected-route-nextjs
* Routing middlewear
https://danishshakeel.me/protected-routes-in-nextjs/

# Adding first time user to db
Users are init via addUserToDb


# Pages
## Explore / Search
Currently, we are grabbing all posts. This is done by iterating through all Uids, and getting their posts. This could be optimized.