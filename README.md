# Benson Jigo Jale - Professional IT & Software Developer Portfolio

A premium, modern, responsive personal portfolio website designed for **Benson Jigo Jale** — Bachelor of Science in Information Technology Graduate, Software Developer, IT Specialist, and Technology Consultant.

The website is optimized for fast loading, fluid responsiveness, search engine optimization (SEO), and custom dark/light theme switching.

---

## 🚀 Key Features

* **Interactive Canvas Background**: A custom, performance-friendly HTML5 Canvas particle/neural network connection background that responds to mouse coordinates.
* **Dynamic Theme Switcher**: Standard dark mode with electric blue and cyan highlights, with a smooth toggle switch to a high-contrast light theme (saves and remembers preferences via `localStorage`).
* **Interactive Filtering**: Filter academic, web, and mobile app projects dynamically without page reloads.
* **Timeline Displays**: Custom styled vertical timelines representing professional history and academic achievements at Kumi University and secondary schools.
* **Scroll-Reveal Animations**: Implements high-performance scroll monitoring via JavaScript `IntersectionObserver` to trigger fade-in animations on components.
* **Contact Integration**: Custom responsive contact form with validation, alongside direct click-to-chat WhatsApp actions, phone numbers, and email linkages.
* **SEO Optimized**: Complies with SEO best practices, utilizing a clean heading hierarchy, semantic HTML5 tags, meta descriptions, open graph sharing setups, and unique IDs on interactive elements.

---

## 🛠️ Technology Stack

* **Structure**: Semantic HTML5 markup
* **Styling**: Vanilla CSS3 (Custom variables, glassmorphism, flexbox, CSS Grid layouts)
* **Interactivity**: Pure Vanilla JavaScript (No heavy framework dependencies for instant loading speed)
* **Icons**: FontAwesome Library via CDN
* **Fonts**: Google Fonts (Outfit for headers, Inter for body copy)

---

## 💻 Local Development

1. **Prerequisites**: Ensure you have Node.js installed on your computer.
2. **Install Dependencies**: Run the following command in the project folder to install the local development server:
   ```bash
   npm install
   ```
3. **Run Dev Server**: Launch the server with:
   ```bash
   npm run dev
   ```
   *This will run `browser-sync` and start a hot-reloading development server at `http://localhost:3000` (or another available port). Saving changes to `index.html`, `style.css`, or `script.js` will immediately refresh the page in your browser.*

---

## 🌐 Deploying to GitHub Pages (Static Hosting)

Since this website is built using standard static web technologies (HTML, CSS, and JS), it is **100% compatible with GitHub Pages** out of the box. GitHub Pages will host your site for free!

Follow these step-by-step instructions to deploy:

### Step 1: Initialize Git and Commit Your Code
If you haven't initialized git in your project directory yet, open your terminal (Command Prompt, PowerShell, or Git Bash) in your project directory and run:
```bash
# Initialize git
git init

# Add all files to staging
git add .

# Create your initial commit
git commit -m "Initial commit of portfolio website"
```

### Step 2: Create a GitHub Repository
1. Log in to your account at [GitHub](https://github.com).
2. Click the **New** button (or go to `https://github.com/new`) to create a new repository.
3. Set the Repository name (e.g., `portfolio` or `benson-jigo-jale`).
4. Keep the repository **Public** (required for free GitHub Pages hosting).
5. Leave "Initialize this repository with..." options unchecked.
6. Click **Create repository**.

### Step 3: Push Your Code to GitHub
Copy the commands shown on GitHub under **"…or push an existing repository from the command line"** and run them in your terminal:
```bash
# Rename default branch to main
git branch -M main

# Link your local repo to GitHub (replace with your repository URL)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

# Push your code
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. On GitHub, navigate to your newly created repository.
2. Click the ⚙️ **Settings** tab near the top right.
3. In the left-hand sidebar, scroll down to the **Code and automation** section and click **Pages**.
4. Under **Build and deployment**:
   * **Source**: Select **Deploy from a branch** from the dropdown menu.
   * **Branch**: Select **main** (and leave the folder path as `/ (root)`).
5. Click the **Save** button.

### Step 5: View Your Live Portfolio!
* After saving, wait 1 to 2 minutes for GitHub Actions to build and deploy your site.
* Refresh the Pages settings page, and you will see a banner at the top saying:
  > **Your site is live at `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`**
* Click the link to open your live, professional portfolio website!

---

## 📁 Project Structure Details

- `index.html` - Core semantic page containing all details, sections, and SEO tags.
- `style.css` - Custom styling rules, glassmorphism templates, animations, and dark/light variables.
- `script.js` - Dynamic interactions (canvas, theme state, typewriter, project filter, scroll revealing).
- `assets/` - Folder containing profile photos (`benson Jigo.jpg`, `benson Jigo jale.jpg`) and CV download files (`benson_jigo_jale_cv.pdf`).
- `package.json` - Configures development scripts.
- `.gitignore` - Prevents temporary node modules from being tracked.
