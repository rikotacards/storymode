# July 14 2023
Added Picker (ui for all emojis) to the react drawer. 

# June 23 2023
Logging down all outstanding issues here: 
- [ ] Non logged in user shouldnt be able to leave comment
- [ ] Fix adding emoji
- [ ] Make quick react drawer work
- [ ] Post: ensure too much text on post scrolls properly
- [ ] horizontal scroll when too many reactions

## Features
- [ ] Add draft

# June 8 2023
Login issue. Thought it was a bug on my end. but actually, it's an issue with firebase. The fix is that you HAVE to login to the app via the same authDomain, and not from localhost or anything like that. 

# June 6 2023
- [x] Try and fix the log in issue. Focused 1 hour. 

Other outstanding issues carrying from before: 
- [ ] Fix login issue
- [ ] Fix reacting issue
- [ ] Fix "notification" text in notification page

# June 5 2023
Polished up the notifications part, added the images correctly.
Next, need to fix the column issue with the main.
- [x] Fixed main column

For next session: 
- [ ] Fix login issue
- [ ] Fix reacting issue
- [ ] Fix "notification" text in notification page

- I should add a back button. Didn't want to originally. 
# June 4 2023
- [x] Finish notification section
- [ ] Fix deployment
# June 1 2023
- Working on the comments feature now. 
- Finished ability to add and delete comments
# May 30 2023
- Highest priority now is to create the below features: 
- Be able to add comments
- Be able to retrieve comments
- You've worked on creating the comments drawer. 
# May 29 2023 Monday
- [x] Make comments section
- [ ] Create notifcation section
- [ ] Create better login page
- [ ] Clean up and standardize styling on post.
# March 25 2023 Saturday
- [ ] Fix reactions bug of showing NaN



## Main challenges / blockers for today
* Trying to figure out the best way to display the reactions. 
* Ensuring that once you react, you cannot react again, so needed to save the state. 
* Also, splitting the database information from the UI. This saves one trip of a GET request. Because then once you update the state, you dont need to 'get' the state again to display the most up to date information. 
# March 24 2023 Friday
- [ ] Make post component mobile friendly.
- [x] Add reactions to db.
- [x] Find a way to remove the blob  data. 
- [x] Add firestore image path to grab image.
- [x] Bonus, added emoji selection
- [ ] Consider moving the 'getImage' 
function inside the 'getposts'
- [x] infinity render
## Main challenges / blockers for today
* SUPER annoying bug, the thumbnail kept on re-rendering for the upload image. Eventually fixed it, but it took hours and hours. The issue was to do with the mapping keys Since the component is mapped out from an array. 

# March 23 2023 (Thursday)
- [x] Create the get method for retrieving all posts belonging to me. 
- [x] Figure out how to relate reactions to the specific post. Likely we will have a `/content/reactions/post` collection, where each post will have a reaction that people can edit.
  - This is done via `/reactions/postid/`
  when a post is upload, we create a document with the post Id, `{heart: 0}`
- [x] Create slider function for multiple images and text content.  
- [ ] Render posts in my profile page (and later make it to a grid.)
## Main challenges / blockers for today
Trying to get image in the correct aspect ratio, while keeping them centered
trying to figure out why the slider keeps skipping an image with Navigation turned on.

# March 22 2023
- [x] Add upload feature. Added ability to upload post to firestore, as well as images to firebase storage. 
  - challenges involved storing the file as a blob in storage, and a data_url in firebase storage
  - Another challenge was how to create multiple AddPost components. The trade off between uploading multiple images, vs uploading images one at a time. I ultimately settled for uploading images one at a time. 
  - I was also trying to figure out when to use <b>getStaticProps</b>

## Main challenges / blockers for today

Today, the main challenge was re-learning how to add documents in firebase storage. I spent about the entire day debugging permission issues, but it just turned out to be my `.env.locale` file wasn't correct. I had some commas in the environmental variable which shouldn't be there

# Feature backlog
- [ ] upload multiple images at a time. How does that work in relation to captions. (added March 22 2023)