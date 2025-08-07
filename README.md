# 🎬📚 Entertainment Explorer

A web application to discover **movies**, **TV series**, and **books** — all in one place.  
Search by **genre**, filter results, check **IMDb ratings**, and watch **trailers** instantly.

---

## ✨ Features

- 🔍 **Search by Genre** – Quickly filter movies, series, or books by your favorite categories.
- ⭐ **IMDb Ratings** – See up-to-date IMDb scores directly in the results.
- 🎥 **Watch Trailers** – Embedded trailer player for quick previews.
- 📚 **Books Integration** – Browse and search for books alongside audiovisual media.
- 🎯 **Advanced Filters** – Filter by type, year, rating, and more.
- 📱 **Responsive Design** – Works seamlessly on desktop, tablet, and mobile.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla or Framework, React was used)
- **Backend:** Node.js + Express 
- **API Sources:**
  - [IMDb API](https://imdb-api.com/) for ratings and details
  - [YouTube API](https://developers.google.com/youtube) for trailers
  - [Google Books API](https://developers.google.com/books) for books data
- **Database:** MongoDB / JSON (depending on implementation)
- **Styling:** Tailwind 

---

## 📦 Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/username/entertainment-explorer.git
   cd entertainment-explorer
   ```



2. **Install Dependencies**  
Next, install all the required Node.js packages:

```bash
npm install
```


3. **Configure Environment Variables**  
Create a `.env` file in the root directory of the project. This file will store your API keys, which are essential for the application to function. You can obtain these keys from the respective API providers mentioned in the Tech Stack section.

Add your keys to the `.env` file in the following format:

```ini
IMDB_API_KEY=your_imdb_api_key
YOUTUBE_API_KEY=your_youtube_api_key
GOOGLE_BOOKS_API_KEY=your_google_books_api_key

```


4. **Run the Application**  
Finally, start the development server:

```bash
npm start
```
The application will then be accessible in your web browser at http://localhost:3000.

