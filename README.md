<div align="center">

# 🎬 Movie Search

**Search any movie. See its poster, rating, cast and story, instantly.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open_the_app-E3C47A?style=for-the-badge&logo=netlify&logoColor=1B1745)](https://shivam-movie-search.netlify.app)

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![OMDb API](https://img.shields.io/badge/OMDb_API-12103A?style=flat-square)

<br />

![Movie Search screenshot](screenshot.png)

</div>

---

## 🔀 Application Flow

```mermaid
flowchart TD
    A([Start]) --> B[Open Movie Search App]
    B --> C[Enter Movie Name]
    C --> D[React Handles Search]
    D --> E[Fetch Data from OMDb API]
    E --> F{API Response}

    F -->|Success| G[Get Movie Results]
    F -->|No Results| H[Show No Results Message]
    F -->|API Error| I[Show Error Message]

    G --> J[Display Movie Poster Grid]
    J --> K[Select a Movie]
    K --> L[Fetch Movie Details]
    L --> M[Show Details Popup]

    M --> N{Load More?}
    N -->|Yes| O[Fetch Next Page]
    O --> J
    N -->|No| P([End])

    H --> P
    I --> P
```

--- 
## ✨ Features

| | |
|---|---|
| 🔎 **Instant search** | Type a movie name or tap a suggestion chip |
| 🖼️ **Poster grid** | Smooth card animations and a clean, responsive layout |
| ⏳ **Loading skeletons** | Shimmer placeholders while the data loads |
| 📄 **Details popup** | Rating, genre, plot, director and cast in one place |
| ➕ **Load more** | Fetch more results page by page |
| ⚠️ **Friendly errors** | Clear messages for no results, bad key or no internet |
| 📱 **Responsive** | Works on phones, tablets and laptops |
| 🪟 **Glass design** | Frosted-glass look with soft glowing backgrounds |

## 🛠️ Built with

- **React** for the interface, using hooks like `useState`, `useEffect` and `useRef`
- **Vite** for fast development and builds
- **OMDb API** for movie data
- **Plain CSS** for all styling, animations and the glass effect

## 🧠 What I learned

- Fetching data from a real API with `fetch` and `async/await`
- Handling loading, error and empty states in the UI
- Cleaning up effects so old requests never overwrite new ones
- Splitting the app into small reusable components
- Keeping secret keys out of the code with environment variables

## 🚀 Run it locally

1. **Clone the project**
   ```bash
   git clone https://github.com/shivamkumar0097/movie-search.git
   cd movie-search
   ```

2. **Get a free API key** from [omdbapi.com](https://www.omdbapi.com/apikey.aspx) and activate it from your email.

3. **Create a `.env` file** in the project root:
   ```env
   VITE_OMDB_KEY=your_key_here
   ```

4. **Install and start**
   ```bash
   npm install
   npm run dev
   ```

Then open `http://localhost:5173`.

## 🗂️ Project structure

```
movie-search/
├── src/
│   ├── App.jsx      # search, grid and popup
│   └── App.css      # all styles and animations
├── .env             # your API key (not uploaded to GitHub)
└── index.html
```

## 👋 About me

I'm **Shivam Kumar**, a BCA student and frontend developer learning React by building real projects.

[![GitHub](https://img.shields.io/badge/GitHub-shivamkumar0097-181717?style=flat-square&logo=github)](https://github.com/shivamkumar0097)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-shivamkumar0097-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/shivamkumar0097)
[![Email](https://img.shields.io/badge/Email-shivamkr8135@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:shivamkr8135@gmail.com)

<div align="center">

⭐ If you liked this project, give it a star!

</div>
