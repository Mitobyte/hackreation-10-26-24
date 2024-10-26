# hackreation-10-26-24

- Team Name: Chris
- Participants: Chris
- Project Name: Bookmark
- Project Description: A bookmarking project.


## Instructions

To run locally, this requires a postgres server setup and node v23.0.0.
- Install dependencies by running `npm install` in the project root.
- Navigate to the `server/` directory.
- Copy the `.env.example` to `.env` and fill in missing fields.
- Update the database connection string to your postgres server and 
- Next run `npx prisma generate` to regenerate prisma db client code.
- Then `npx prisma db push` to generate the tables in the target postgres db.
- Now navigate back to the project root and `npm run dev` will spin up the app in development mode.
- Go to localhost:3007 in your browser to see the app. By default in dev mode the client will run on port 3007 and the server on port 3006.


## Bookmarklet

Create a bookmark in your browser and past the below as the link content. This bookmarklet should open the app
in a tab with the page of the url you had clicked this bookmarklet on prefilled out in the url form field.

```
javascript: (() => { window.open(`http://localhost:3007/bookmark/create?url=${encodeURIComponent(window.location.href)}`, "_blank"); })()
```
