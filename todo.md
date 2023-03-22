# March 23 2023 (Thursday)
- [ ] Create the get method for retrieving all posts belonging to me. 
- [ ] Figure out how to relate reactions to the specific post. Likely we will have a `/content/reactions/post` collection, where each post will have a reaction that people can edit. 
- [ ] Create slider function for multiple images and text content.  

# March 22 2023
- [x] Add upload feature. Added ability to upload post to firestore, as well as images to firebase storage. 
  - challenges involved storing the file as a blob in storage, and a data_url in firebase storage
  - Another challenge was how to create multiple AddPost components. The trade off between uploading multiple images, vs uploading images one at a time. I ultimately settled for uploading images one at a time. 
  - I was also trying to figure out when to use <b>getStaticProps</b>

## Main challenges / blockers for today

Today, the main challenge was re-learning how to add documents in firebase storage. I spent about the entire day debugging permission issues, but it just turned out to be my `.env.locale` file wasn't correct. I had some commas in the environmental variable which shouldn't be there

# Feature backlog
- [ ] upload multiple images at a time. How does that work in relation to captions. (added March 22 2023)