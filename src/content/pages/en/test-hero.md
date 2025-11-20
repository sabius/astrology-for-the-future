---
meta:
  title: "Hero Test Page"
  description: "Testing multiple hero instances and intersection observer"
content:
  - component: "hero"
    header: "Hero 1: Top of Page"
    copy: "This hero should load immediately or fade in quickly."
    button:
      text: "Learn More"
      url: "#"
    background_image: "https://res.cloudinary.com/dxjb0k35c/image/upload/v1686670000/astrology/hero-bg-1.jpg"
  
  - component: "split-content"
    columns:
      - items:
          - heading: "Spacer Content"
            copy: "Scroll down to see the next hero."
            boxed: true
  
  - component: "hero"
    background_image: "https://res.cloudinary.com/dxjb0k35c/image/upload/v1686670000/astrology/hero-bg-2.jpg"
    image_alt: "Decorative background"

  - component: "split-content"
    columns:
      - items:
          - heading: "More Spacer"
            copy: "Keep scrolling..."
            boxed: true

  - component: "hero"
    header: "Hero 3: Bottom of Page"
    copy: "This hero should fade in when you reach the bottom."
    button:
      text: "Get Started"
      url: "#"
    background_image: "https://res.cloudinary.com/dxjb0k35c/image/upload/v1686670000/astrology/hero-bg-3.jpg"
---
