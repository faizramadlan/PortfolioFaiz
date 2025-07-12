# 🎮 Interactive Portfolio Website

A gamified, pixel-art styled portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features an interactive mini-game that unlocks different sections of the portfolio as you play!

## ✨ Features

### 🎯 Gamification
- **Interactive Mini-Game**: Play a retro-style jumping game to unlock portfolio sections
- **Score System**: Earn points by avoiding obstacles and achieve high scores
- **Progressive Unlocking**: Different sections unlock at different score thresholds
- **Achievement Notifications**: Celebrate unlocks and high scores with animations

### 🎨 Visual Design
- **Pixel Art Aesthetic**: Retro gaming-inspired design with vibrant colors
- **Smooth Animations**: Hover effects, transitions, and celebration animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Gradient Backgrounds**: Beautiful color transitions throughout the interface

### 📱 User Experience
- **Intuitive Navigation**: Clear section buttons with unlock indicators
- **Modal Content**: Detailed information displayed in elegant popup modals
- **Keyboard Controls**: Full keyboard support for the mini-game
- **Accessibility**: Focus indicators and screen reader friendly

### 🛠 Technical Features
- **TypeScript**: Full type safety and better development experience
- **Next.js 14**: Modern React framework with App Router
- **Tailwind CSS**: Utility-first styling with custom pixel art theme
- **Session Storage**: Progress persistence across browser sessions
- **Responsive Design**: Mobile-first approach with breakpoint optimization

## 🎮 How to Play

1. **Start the Game**: Click the "Play" button to begin
2. **Controls**:
   - Press `Space` or `↑` to jump
   - Press `↓` or `S` to crouch
   - Avoid the cacti to survive longer
3. **Earn Points**: Score increases over time as you survive
4. **Unlock Sections**: Reach score thresholds to unlock portfolio sections:
   - 0 points: Professional Summary
   - 300 points: Skills
   - 600 points: Experience
   - 1200 points: Education
   - 2000 points: Certifications
   - 3000 points: Projects
   - 4000 points: Contact

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Colors
The color scheme is defined in `src/app/globals.css`:
```css
:root {
  --pixel-green: #347433;
  --pixel-yellow: #FFC107;
  --pixel-orange: #FF6F3C;
  --pixel-red: #B22222;
}
```

### Content
Update the `sections` array in `src/app/page.tsx` to modify:
- Section titles and icons
- Content descriptions
- Unlock score thresholds
- Project details and links

### Game Settings
Modify game parameters in `src/app/MiniGame.tsx`:
- Game speed and difficulty
- Obstacle spawning frequency
- Character movement physics
- Visual elements and animations

## 📁 Project Structure

```
portfolio/
├── src/
│   └── app/
│       ├── globals.css          # Global styles and animations
│       ├── layout.tsx           # Root layout component
│       ├── page.tsx             # Main portfolio page
│       └── MiniGame.tsx         # Interactive mini-game component
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🎯 Key Improvements Made

### Visual Enhancements
- ✅ Added gradient backgrounds and hover effects
- ✅ Implemented smooth animations and transitions
- ✅ Enhanced responsive design for mobile devices
- ✅ Added pixel art styling with custom borders
- ✅ Improved typography and spacing

### User Experience
- ✅ Added help/instructions modal
- ✅ Enhanced notification system with animations
- ✅ Improved button interactions and feedback
- ✅ Added confirmation dialogs for destructive actions
- ✅ Better accessibility with focus indicators

### Content Organization
- ✅ Structured skills into logical categories
- ✅ Enhanced project descriptions with metrics
- ✅ Added status badges for education and experience
- ✅ Improved contact section with additional information
- ✅ Better visual hierarchy and information architecture

### Technical Improvements
- ✅ Fixed TypeScript linter errors
- ✅ Enhanced CSS animations and keyframes
- ✅ Added custom scrollbar styling
- ✅ Improved responsive breakpoints
- ✅ Better state management and effects

## 🛠 Built With

- **[Next.js](https://nextjs.org/)** - React framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[React](https://reactjs.org/)** - UI library

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: ramadlan.faiz@gmail.com
- **LinkedIn**: [linkedin.com](https://linkedin.com)

---

⭐ **Star this repository if you found it helpful!**
