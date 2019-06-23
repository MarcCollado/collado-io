export { default as WorkCard } from './WorkCard';

/* WorkCard.js
- Renders a card for any given work post.
- Receives { title, path, excerpt } as props.
- Fetches thumbnail image through <StaticQuery /> for each work post.
- Unlike BlogCard, { path } links to the custom work page instead of the template page (BlogPost).
- TODO: { title, excerpt } could be passed down as props to the work page through state (location.state) within the Link component. But the data doesn't persist upon refresh.
*/
