# collado.io

In this README.md file you'll find some (nonessential) insights on the site's inner mechanics. I mostly keep it for myself, but since you're already here, please take a look.

## Changelog

### 🌙 v22.11

- New: dark mode support.
- Fixed: invalid RSS parsing token that broke the feed.

### 💅 v22.10

This release is a very special one. It brings a major update to the site, not only to its design, but also to some of its features.

- Design: revamped — lighter — fonts, colors, and overall look and feel.
- Features: `v22.10` can somehow be seen as the "less is more" update. Because, for the first time, it has fewer features than its predecessor. Among other things, the Work section and all the dedicated Work pages have been deprecated in favor of a simpler and unified About page. The Now page has followed a similar fate and is now part of the About page as well.

On top of that, internally, it has also removed a lot of tools and dependencies — such as Styled Components or legacy Gatsby plugins. All this reduction was a necessary intermediate step that will make room for new, upcoming features. Otherwise, with the old architecture and legacy code, it would have taken a lot more effort to build.

Enjoy 😎

### v22.9

This was the last release deployed under the "old design". It is still available at the [Wayback Machine](https://web.archive.org/web/20220926092650/https%3A%2F%2Fwww.collado.io%2F) for future reference.

## Reference

### Special tags

The [tag system](https://www.collado.io/tags/) labels posts' content according to its subject and aggregates them under its corresponding tag page. However, there are a set of "special" tags — listed below — used to organize and structure the site.

Project classifiers:

- [`wiz music`](https://www.collado.io/tags/wiz%20music)
- [`foc a terra`](https://www.collado.io/tags/foc%20a%20terra)
- [`safareig`](https://www.collado.io/tags/safareig)
- [`gamestry`](https://www.collado.io/tags/gamestry)
- [`radio lanza`](https://www.collado.io/tags/radio%20lanza)
- [`ironhack`](https://www.collado.io/tags/ironhack)
- [`iomando`](https://www.collado.io/tags/iomando)

Project organizers — used in combination with `project classifiers` to filter React Tabs (deprecated since v22.10).

- [`idea`](https://www.collado.io/tags/idea)
- [`memoir`](https://www.collado.io/tags/memoir)
- [`update`](https://www.collado.io/tags/update)

Side projects:

- [`books`](https://www.collado.io/tags/books): book summaries
- [`meta`](https://www.collado.io/tags/meta): updates from [collado.io](http://www.collado.io/)
- [`now`](https://www.collado.io/tags/now): posts from the "now" page (deprecated since v22.10)
- [`pansa`](https://www.collado.io/tags/pansa)
- [`sub3`](https://www.collado.io/tags/sub3)
- [`til`](https://www.collado.io/tags/til)
- [`udacity`](https://www.collado.io/tags/udacity)
