export const filterPosts = (tagsIn = [], tagsIni = []) => {
  const include = tagsIn.length > 0;
  const notInclude = tagsIni.length > 0;

  return !include && !notInclude
    ? `{ fileAbsolutePath: { regex: "/src/markdown/posts/" } }`
    : `{
        fileAbsolutePath: { regex: "/src/markdown/posts/" }
        ${include ? `frontmatter: { tags: { in: ${tagsIn} } }` : ''}
        ${notInclude ? `frontmatter: { tags: { ini: ${tagsIni} } }` : ''}
      }`;
};
