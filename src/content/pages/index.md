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

  # Block 2: A Split Content Section
  - component: "split-content"
    image: "https://via.placeholder.com/600x400"
    image_alt: "A placeholder image."
    header: "Powerful Content Organization"
    copy: "By defining components in YAML, you can easily reorder, add, or remove sections of your page."
    image_position: "left"

  # Block 3: A Call to Action
  - component: "cta"
    header: "Ready to Get Started?"
    button:
      text: "Sign Up Now"
      url: "/signup"
      style: "primary"
---

<!-- You can leave the body of the markdown file empty -->
