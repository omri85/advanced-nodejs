## Advanced nodejs project


### The StoryTeller:

StoryTeller is an API-based web service that allows users to write stories in continuation. Once they create a story they can add another piece to the story - a segment - whenever they want. In addition, users can gather stories into publications.



*   Publication
    *   A collection of stories that belong to a user
    *   The stories might not necessarily belong to a user who owns the publication.
*   Segment:
    *   A part of a story. It has time, content and a story
    *   Each segment belongs to one story
*   Story
    *   A story has a title, hashtags, and segments
    *   A story belongs to one user
    *   Notice that a user is expected to have dozens of stories, a story can have thousands of segments
    *   A story can be shared around different publications, not necessarily of the user that wrote them
*   User:
    *   A unique entity
    *   Has email, name, and password

**Notes:**



1. The service does not allow any profane words. That applies for all stories (name and hashtags), segments (content) and user (name and email).
2. The service complies with the data privacy protocol. Therefore any user that wishes can ask to be removed. When they do, all publications, stories, and segments which belong to them must be deleted within 12 hours. In the future, we will want to archive this data (anonymously) before we delete it.
3. The service is API based (no GUI) and guarantees a <span style="text-decoration:underline;">sub-second response time</span>.



**Basic functionality (MVP):**



*   Register a new user.
*   Get user details - name, address, and number of stories
*   Ask to be deleted (read note #1)
*   Get deletion status - after a user asks to be deleted from the system, they can see what’s the status of the deletion (Pending / Done). The status will be available only for an hour after deletion was completed
*   Create a segment
*   Create a story
*   Add a segment to a story. The recently added segment is the last one of the story
*   Get a story by ID - as JSON or plain HTML
*   Search for stories by hashtags attributes
*   Search segments by a word in the content.

### Part I - design:


#### Design a web service that supports the MVP:

1. What APIs will it have and how will the endpoints look like?
2. Which databases should be used?
3. How is the data modeled?
4. What other components the service has except for a web-server and DBs?
5. How will the service ensure the sub-second SLA when it has millions of users?
6. In a more granular level: which features of nodejs and expressjs could we leverage to efficiently and easily implement all requirements. (For the ones that are quick, otherwise, this could be done in the next part)

### Part II - implementation

1. Create a web service that supports all of the MVP requirements based on the design you made in the previous part. Before you start, make sure to think about how can the topics that we learned throughout the course help you.
2. Add at least one unit-test and one integration test
3. After you’re done implementing the functionality, profile the web app. Try to identify the heavy operations (try to use stories with many segments for that) and provide the performance metrics for the story endpoint.

If you have time here are some extra features: 



*   Implement authentication to make sure that only the user can change their data and no-one else’s. Notice that endpoints that only retrieve data should remain open for everyone. Use Basic Authentication as the auth method
*   Add the option to start a 24h counter for a specific story and get counter for a story
*   Implement pagination for the get story endpoint
*   Support Admin users:
    *   A user might be an Admin
    *   Admins can perform actions on all stories, segments, publications, and users in the system via API or ORM
    *   Making a user an admin can only be done manually through the ORM
*   Support publication CRUD operations
*   Add Admin-panel

**Guidelines:**



*   Prefer promises and async / await over callbacks
*   Use ES6 - const and let, object deconstruction, etc
*   Choose the best DB for the right functionality - SQL, MongoDB, and Redis
*   Implement the deletion part using a distributed system architecture (queues, producers, consumers)
*   Make sure that errors are handled correctly and do not reach the user
*   User middlewares for error handling and validation
*   Use third parties packages as much as possible and avoid inventing the wheel