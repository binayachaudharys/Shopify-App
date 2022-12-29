export const name = 'Seasonal Landing';
export const settings = [
  {
    "type": "text",
    "id": "heading",
    "label": "Heading",
    "default": "FAQ heading"
  },
  {
    "type": "text",
    "id": "description",
    "label": "Description",
    "default": "FAQ description"
  },
  {
    "type": "select",
    "id": "faq",
    "default": "1",
    "label": "Faqs Select",
    "options": [
      {
        "value": "1",
        "label": "Hello"
      },
      {
        "value": "2",
        "label": "Hees"
      },
      {
        "value": "3",
        "label": "Hope you Dream"
      }
    ]
  }
];
export const blocks = [{
  "target": "section",
  "stylesheet": "image-gallery.css",
  "javascript": "test.js",
  "templates": ["product", "index"],
}
];