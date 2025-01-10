import BlogPost from "@/components/BlogPost";
import { getCollection } from "@/lib/db";


export default async function Home() {
  const postsCollection = await getCollection('posts');
  const posts = await postsCollection?.find()
    .sort({ $natural: -1 })
    .toArray();

  if (posts) {
    return (
      <div className="grdi grid-cols-2 gap-6">
        {
          posts.map((post) => (
            <div className="" key={post._id}>
              <BlogPost post={post} />
            </div>
          ))
        }
      </div>
    );
  } else {
    return (
      <div>
        <p>Failed to fetch the data from database.</p>
      </div>
    );
  }
}
