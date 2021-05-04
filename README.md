# Team Eazy Sneezy Social Media App

Social media platform that allows users to share pictures and follow each other. Instagram clone of sorts.

Link: https://eazy-sneezy-social-media.herokuapp.com/

## How it's made

Tech used: HTML, CSS, JavaScript, Node.js, Express.js, MongoDB

--- Here's where you can go to town on how you actually built this thing. Write as much as you can here, it's totally fine if it's not too much just make sure you write something. If you don't have too much experience on your resume working on the front end that's totally fine. This is where you can really show off your passion and make up for that ten fold. ---

_**Server**_

_**Views**_

_**Model**_ We developed two models; the User and Entry models. The Entry model also holds the schema for "likes", which it then stores as an array in each entry in the entries collection. We considered making a separate file for the Likes schema, as well as a separate collection, but ultimately simplified by keeping it with the Entry schema and entries collection.

_**Controllers**_

## Optimizations

--- You don't have to include this section but interviewers love that you can not only deliver a final product that looks great but also functions efficiently. Did you write something then refactor it later and the result was 5x faster than the original implementation? Did you cache your assets? Things that you write in this section are GREAT to bring up in interviews and you can use this section as reference when studying for technical interviews! ---

**Like Button Toggle** We could have done this many ways, of course, but ultimately, we went with checking in the EJS if the user's id was included in the entry's likes array. If so, display the unlike functionality, which is linked to the unlike method in the entry controller, and if not, display the like functionality, which is linked to the like method instead.

## Lessons learned

_**Collaboration**_ - we worked together as a team to divvy tasks and to check in with each other about our work. We built branches and made PRs, tested and reviewed each other's code, and we learned a lot about how to use Github to track and develop our workflow.

_**Version Control**_ - there were a few times we had to back track to figure out what went wrong. From `git checkout <branch-name>` to `git log` and `git checkout -b <new-branch-name>` to figuring out how to reconsile merge conflicts, we picked up quite a bit along the way.
