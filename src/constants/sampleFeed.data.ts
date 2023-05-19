import { PostFromDbProps } from "@/firebase/db";

export const demoFeed: PostFromDbProps[] = [
  {
    author: "max",
    content: [
      { imagePath: '/demo/demoPost1Part1.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Day 1 of New York. It was a chilly 9 degrees celsius. I'm here to instruct a bootcamp.", blobData: "string" },
      { imagePath: '/demo/demoPost1Part2.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "My colleague teaching a classroom full of eager engineers.", blobData: "string" },
      { imagePath: '/demo/demoPost1Part3.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Had a great time catching up with old friends.", blobData: "string" },
      { imagePath: '/demo/demoPost1Part4.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Water-side jog. The weather got unexpectedly hot! 30 Degrees celsius", blobData: "string" },
      { imagePath: '/demo/demoPost1Part5.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Got dinner with my friend Shelly, a college friend from Hong Kong.", blobData: "string" },
      { imagePath: '/demo/demoPost1Part6.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Catching up with more Beijing friends. Jack (left) and I shared a school bus, Nick (right) and I went to the same Church.", blobData: "string" },

    ],
    postTime: 1,
    postId: "0",
    demoUsername: 'max',
    demoPhotoUrl: '/demo/demoPost1Part1.png',
    demoReactions: {
      'heart': {
        emoji: '❤️',
        count: 56,
        hasLiked: false
      },
      'smile': {
        emoji: "😀",
        count: 34,
        hasLiked: false
      },
    },
  },
  {
    author: "Camille",
    content: [
      { imagePath: '/demo/demoPost2Part1.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Doing some swing training today!", blobData: "string" },
      { imagePath: '/demo/demoPost2Part2.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Could never do it without the volunteer coaches", blobData: "string" },
      { imagePath: '/demo/demoPost2Part3.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Me, and my two swimming friends that I made over the course of coaching in Hong Kong", blobData: "string" },
    ],
    postTime: 1,
    postId: "0",
    demoUsername: 'camille',
    demoPhotoUrl: '/demo/demoPost2Part1.png',
    demoReactions: {
      'heart': {
        emoji: '❤️',
        count: 1092,
        hasLiked: false
      },
      'smile': {
        emoji: "😀",
        count: 134,
        hasLiked: false
      },
    },
  },
  {
    author: "Michael",
    content: [
      { imagePath: '/demo/demoPost3Part1.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Yesterday by the grace of God I passed my commercial checkride and officially became a commercial pilot ✈️Throughout my commercial training and all the cross country flights I kept on wanting to be done and move on to the next stage. However sometimes you got to slow down and appreciate where you are in life instead of always looking towards the next thing.", blobData: "string" },
      { imagePath: '/demo/demoPost3Part2.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Here’s to reaching 1500 hours 🎉🎊🍾🎈This is a team effort, and I couldn’t have done it alone. Thank you to my parents for suggesting me to be a pilot. Always supporting and encouraging me Thank you to all my instructor for having to deal with me and helping me succeed. Most of all, thank you to all my students for not killing me 😅Excited to see what’s next in this aviation journey", blobData: "string" },
      { imagePath: '/demo/demoPost3Part3.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Happy to be flying", blobData: "string" },
    ],
    postTime: 1,
    postId: "0",
    demoUsername: 'michaelhsu',
    demoPhotoUrl: '/demo/demoPost3Part1.png',
  demoReactions: {
      'heart': {
        emoji: '❤️',
        count: 1092,
        hasLiked: false
      },
      'smile': {
        emoji: "😀",
        count: 134,
        hasLiked: false
      },
    },
  },
  // {
  //   author: "Michael",
  //   content: [
  //     { imagePath: '/demo/demoPost3Part1.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Yesterday by the grace of God I passed my commercial checkride and officially became a commercial pilot ✈️Throughout my commercial training and all the cross country flights I kept on wanting to be done and move on to the next stage. However sometimes you got to slow down and appreciate where you are in life instead of always looking towards the next thing.", blobData: "string" },
  //     { imagePath: '/demo/demoPost3Part2.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Here’s to reaching 1500 hours 🎉🎊🍾🎈This is a team effort, and I couldn’t have done it alone. Thank you to my parents for suggesting me to be a pilot. Always supporting and encouraging me Thank you to all my instructor for having to deal with me and helping me succeed. Most of all, thank you to all my students for not killing me 😅Excited to see what’s next in this aviation journey", blobData: "string" },
  //     { imagePath: '/demo/demoPost3Part3.png', imageUrl: "/../demo/demoPost1Part1.png", caption: "Happy to be flying", blobData: "string" },
  //   ],
  //   postTime: 1,
  //   postId: "0",
  //   demoUsername: 'MichaelHsu',
  //   demoPhotoUrl: '/demo/demoPost3Part1.png',
  //   demoReactions: {
  //     'heart': {
  //       emoji: '❤️',
  //       count: 1092,
  //       hasLiked: false
  //     },
  //     'smile': {
  //       emoji: "😀",
  //       count: 134,
  //       hasLiked: false
  //     },
  //   },
  // },
];
