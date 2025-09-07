---
meta:
  title: "My Awesome Homepage"
  description: "A description of the page for SEO."

content:
  # Block 1: The Hero Section
  - component: "hero"
    header: "Welcome to my site"
    copy: "This is a flexible paradigm for building pages."
    button:
      text: "Learn More"
      url: "/about"
    animate_header:
      duration: "0.7s"
      delay: "0.2s"
    animate_copy:
      duration: "0.7s"
      delay: "0.4s"

  # Block 2: A Split Content Section
  - component: "split-content"
    image: "https://picsum.photos/id/120/600/400"
    image_alt: "A placeholder image."
    header: "Powerful Content Organization"
    copy: "By defining components in YAML, you can easily reorder, add, or remove sections of your page."
    image_position: "left"
    animate_header:
      duration: "0.7s"
    animate_copy:
      delay: "0.2s"

  # Block 3: A Call to Action
  - component: "cta"
    header: "Ready to Get Started?"
    button:
      text: "Sign Up Now"
      url: "/signup"
      style: "primary"
    animate_header:
      duration: "1s"
      delay: "0.5s"

  # Block 4: A Feature Grid
  - component: "feature-grid"
    animate_span:
      duration: "0.8s"
      delay: "0.3s"
---

<!-- You can leave the body of the markdown file empty -->
