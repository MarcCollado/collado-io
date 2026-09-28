<p align="center">
  <a href="#">
    <img alt="Marc Collado" src="src/media/images/avatar.png" width="60" />
  </a>
</p>
<h1 align="center">
  Marc Collado's personal website
</h1>
<p align="center">

collado.io is the place where I share random thoughts and conversations on pretty much everything.

Topics ranging from [product](https://collado.io/tags/product/), [psychology](https://collado.io/tags/psychology/), and how humans behave, [health](https://collado.io/tags/health/), [mobility](https://collado.io/tags/mobility/) and supply chains, global [economics](https://collado.io/tags/economics/)... and everything in between, you get the idea.

In this README.md file you'll find some (nonessential) insights on the site's inner mechanics. I mostly keep it for myself, but since you're already here, please take a look.

## 🏷 Tags

Every post gets its tags by answering three questions, in order. The [tags page](https://collado.io/tags/) lists them all with live counts.

1. **Where does it live?** One shelf tag, always first: the project the post is about or was written for, or the series it belongs to. If neither applies, it's an `insight`.
2. **Is it a milestone?** Add `changelog` when the post announces that something started, shipped, changed or ended: a launch, a release, a pivot, a new role, a goodbye, a change to this site. When no project applies, `changelog` is the shelf.
3. **What is it about?** Up to three topics, in alphabetical order, and only subjects the post is substantially about. Now snapshots, weekly roundups and show launches can go without.

A new tag needs a second post. The first post of a new project goes under `insight` or `changelog`, and the project tag arrives with the second one. The list lives in `src/utils/tags.js`, and `npm test` fails when a post breaks the rule.

### Shelves

Projects:

- [`iomando`](https://collado.io/tags/iomando/): the keyless-access startup I co-founded (2011–2015)
- [`ironhack`](https://collado.io/tags/ironhack/): Barcelona campus manager, then product (2015–2019)
- [`gamestry`](https://collado.io/tags/gamestry/): a video platform for gaming creators (2020–2021)
- [`pansa`](https://collado.io/tags/pansa/): a note-taking app to organize your thoughts and build long-lasting wisdom
- [`sub3`](https://collado.io/tags/sub3/): running a marathon in less than 3 hours
- [`udacity`](https://collado.io/tags/udacity/): documenting the experience of completing a Udacity Nanodegree, and the apps that came out of it
- [`podcasting`](https://collado.io/tags/podcasting/): my shows (Radio Lanza, Safareig, Foc a Terra) and posts written for an episode

Series:

- [`books`](https://collado.io/tags/books/): book summaries, one book per post
- [`til`](https://collado.io/tags/til/): what I learned today and amateurish research about personal interests
- [`now`](https://collado.io/tags/now/): posts from the "now" page (deprecated since v22.10)

Everything else:

- [`insight`](https://collado.io/tags/insight/): my own take on something, when no project or series applies

`books` and `til` also hide the excerpt on the post page, so they're only for book summaries and TIL notes.

### Milestones

- [`changelog`](https://collado.io/tags/changelog/): launches, releases, pivots, arrivals and exits, plus changes to this site

### Topics

- [`ai`](https://collado.io/tags/ai/): machine intelligence as the subject
- [`art`](https://collado.io/tags/art/): creative work and originality
- [`attention`](https://collado.io/tags/attention/): focus, distraction, notifications, feeds
- [`business`](https://collado.io/tags/business/): business models, pricing, strategy, startups
- [`career`](https://collado.io/tags/career/): work, roles, changing jobs
- [`coding`](https://collado.io/tags/coding/): programming and learning to code
- [`devices`](https://collado.io/tags/devices/): phones, watches, e-readers, computers, headsets
- [`economics`](https://collado.io/tags/economics/): markets, money, behavioral economics
- [`education`](https://collado.io/tags/education/): schools, bootcamps, courses, how we learn
- [`habits`](https://collado.io/tags/habits/): habits, routines and goals
- [`happiness`](https://collado.io/tags/happiness/): what makes a life feel good
- [`health`](https://collado.io/tags/health/): fitness, nutrition, sleep and the body
- [`history`](https://collado.io/tags/history/): the past as the subject
- [`media`](https://collado.io/tags/media/): how content is made, spread and paid for (advertising, TV, platforms, creators)
- [`minimalism`](https://collado.io/tags/minimalism/): owning, doing and wanting less
- [`mobility`](https://collado.io/tags/mobility/): cars and transport
- [`philosophy`](https://collado.io/tags/philosophy/): how to live, and what we can know
- [`product`](https://collado.io/tags/product/): building products, from decisions and design to releases
- [`psychology`](https://collado.io/tags/psychology/): how the mind works (biases, behavior, emotion)
- [`reading`](https://collado.io/tags/reading/): how I read (what I read goes under `books`)
- [`society`](https://collado.io/tags/society/): how technology and modern life change how we live together
- [`travel`](https://collado.io/tags/travel/): where I go, and why
- [`vr`](https://collado.io/tags/vr/): virtual and mixed reality

Waiting for a second post: `politics`, `religion`, `science`.

## Formatting

Pull requests run `npx prettier -c` to verify code style. Run `npm run format` to fix files locally.
