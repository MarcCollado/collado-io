export { default as BlogCard } from './BlogCard';

/* BlogCard.js
- Renders a card for any given blog post.
- Receives { title, date, path, excerpt } as props.
- Links to { path } which renders the blog post through the BlogPost component.
- TODO: { title, date, excerpt } could be passed down as props to BlogPost through state (location.state) within the Link component. But the data doesn't persist on BlogPost upon refresh.
- TODO: show tags alongside the published date.
*/
