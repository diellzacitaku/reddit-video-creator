export default class Fetcher {
    constructor(options) {
        this.subReddit = options.subReddit;
        this.redditType = options.redditType;
        this.redditNumber = Number(options.redditNumber);
        this.redditCommentsNumber = Number(options.redditCommentsNumber);
    }

    async fetch(wrapper) {
        const subReddit = wrapper.getSubreddit(this.subReddit);

        const deserializePosts = (posts) => {
            return posts.map((post) => {
              return post.comments.fetchMore({ amount: this.redditCommentsNumber }).reduce(
                (acc, next) => {
                  return {
                    ...acc,
                    comments: [
                      ...acc.comments,
                      { text: next.body, ups: next.ups, author: next.author.name, created: next.created_utc },
                    ],
                  };
                },
                {
                  title: {
                    text: post.title,
                    ups: post.ups,
                    author: post.author.name,
                    created: post.created_utc,
                  },
                  comments: [],
                }
              );
            });
          };

        return (
            this.redditType === "top" ? subReddit.getTop({ limit: this.redditNumber }) : subReddit.getHot({ limit: this.redditNumber })
          )
            .then(deserializePosts)
            .then(async (a) => await Promise.all(a));

    }
}