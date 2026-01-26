# Portfolio Website

A modern, responsive portfolio website built with vanilla JavaScript, HTML, and CSS.

## Project Structure

```
Portfolio Website Project/
├── index.html              # Main HTML file
├── styles.css              # Main stylesheet (all CSS combined)
├── transition.js           # Navigation, scroll animations, role text, timeline
├── videoHover.js          # Video modal functionality
├── resumeModal.js         # Resume modal functionality
├── BusinessLogos/         # Company logos
├── collegeLogos/          # Educational institution logos
├── photoOfMe/            # Personal photos
├── resumeUpload/         # Resume PDF file
└── README.md             # This file
```

## Features

- **Responsive Design**: Mobile-first responsive layout
- **Scroll Animations**: Elements fade in as you scroll
- **Animated Role Text**: Rotates through different roles every 3 seconds
- **Timeline Animation**: Progress bar and content appear on scroll
- **Video Modals**: Click project videos to view in fullscreen modal
- **Resume Modal**: View resume in a modal overlay
- **Smooth Navigation**: Smooth scrolling between sections
- **Custom Cursor**: Glowing cursor effect that follows mouse movement

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern CSS with custom properties (variables)
- **Vanilla JavaScript**: No frameworks, pure JavaScript
- **Font Awesome**: Icons
- **PDF.js**: PDF rendering (loaded via CDN)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Custom Properties (CSS Variables)

## Usage

### Local Development

1. Open `index.html` directly in a browser, or
2. Use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server)
   npx http-server
   ```
3. Navigate to `http://localhost:8000` in your browser

## Code Organization

- **styles.css**: All CSS in one file for easy maintenance
- **transition.js**: Main JavaScript file handling navigation, animations, and interactions
- **videoHover.js**: Video modal functionality
- **resumeModal.js**: Resume modal functionality

## Customization

### Colors and Styling

All design tokens are defined as CSS custom properties at the top of `styles.css`:

```css
:root {
    --color-primary: #8A82FF;
    --color-background: #1E1E1E;
    /* ... more variables ... */
}
```

### Role Text

Edit the roles array in `transition.js`:

```javascript
const roles = ['Aspiring Software Engineer', 'Team Member', 'Fast Learner', 'Critical Thinker'];
```

### Contact Information

Update contact information directly in `index.html`.

## License

Personal portfolio project.
