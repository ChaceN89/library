# Next.js Routing and App Router File Conventions

This document provides an overview of the routing conventions in Next.js, focusing on the App Router and its file structure.

---

## File Structure
Below is an example of the basic file structure for a Next.js application utilizing the App Router:
```plaintext
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
```

### Routing Overview
- **Static Routes**: Files like `page.js` represent specific static routes, e.g., `page.js` in the `login` directory maps to `/login`.
- **Dynamic Routes**: Files enclosed in square brackets (e.g., `[id]/page.js`) represent dynamic routes. The file above corresponds to `/text/:id` where `id` is a variable.

---

## Special Files in Next.js Routing
Next.js App Router introduces special files to handle specific UI behaviors. Below is a summary of these files and their purposes:

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `layout.js`     | Defines shared UI (e.g., headers, footers) for a segment and its children.  |
| `page.js`       | Represents a unique route and makes the route publicly accessible.         |
| `loading.js`    | Displays a loading UI for a segment and its children while fetching data.  |
| `not-found.js`  | Handles not-found UI for a segment and its children.                       |
| `error.js`      | Renders an error UI for a segment and its children in case of an error.    |
| `global-error.js` | A global error UI for the entire application.                            |
| `route.js`      | Defines a server-side API endpoint for a segment.                          |
| `template.js`   | Specialized re-rendered layout UI for specific use cases.                  |
| `default.js`    | Fallback UI for parallel routes when no other UI is defined.               |

For more details, refer to the official [Next.js routing documentation](https://nextjs.org/docs/app/building-your-application/routing).

---

## Additional Resources
- **Dynamic Routing**: Learn how to create dynamic routes for complex URL patterns.
- **API Routes**: Set up server-side API endpoints within your application.
- **Layouts and Nested Routes**: Understand how layouts work for nested pages.

By understanding and leveraging these conventions, you can build scalable and maintainable Next.js applications with ease.

