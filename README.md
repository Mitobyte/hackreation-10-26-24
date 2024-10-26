# hackreation-10-26-24

- Team Name: Chris
- Participants: Chris
- Project Name: Bookmark
- Project Description: A bookmarking project.


## Instructions


## Bookmarklet

Create a bookmark in your browser and past the below as the link content. This bookmarklet should open the app
in a tab with the page of the url you had clicked this bookmarklet on prefilled out in the url form field.

```
javascript: (() => { window.open(`http://localhost:3007/bookmark/create?url=${encodeURIComponent(window.location.href)}`, "_blank"); })()
```
