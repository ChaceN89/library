app/
├── layout.js                   # Global layout applied to all pages
├── page.js                     # Home page ("/")
├── login/
│   └── page.js                 # Login page ("/login")
├── register/
│   └── page.js                 # Register page ("/register")
├── search/
│   └── page.js                 # Search page ("/search")
├── account/
│   └── page.js                 # Account page ("/account")
└── text/
    └── [id]/page.js            # Dynamic route for text documents ("/text/:id")




    https://nextjs.org/docs/app/building-your-application/routing

Routiung App Router file conventions 
Next.js provides a set of special files to create UI with specific behavior in nested routes:

layout	Shared UI for a segment and its children
page	Unique UI of a route and make routes publicly accessible
loading	Loading UI for a segment and its children
not-found	Not found UI for a segment and its children
error	Error UI for a segment and its children
global-error	Global Error UI
route	Server-side API endpoint
template	Specialized re-rendered Layout UI
default	Fallback UI for Parallel Routes


A method of fixing FOUC (Flash of Unstyled Content) - I have a fix i nthe layout.js file but this might be a better fix in the future
https://kulembetov.medium.com/preventing-flash-of-unstyled-content-fouc-in-next-js-applications-61b9a878f0f7#:~:text=What%20Causes%20FOUC%3F,asynchronously%20to%20improve%20load%20time.