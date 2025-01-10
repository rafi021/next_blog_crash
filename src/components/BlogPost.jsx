import React from 'react'
import Link from "next/link";
const BlogPost = ({ post }) => {
    return (
        <div className="p-6 bg-white shadow-md rounded">
            <div className="border border-slate-400 border-dashed p-4 rounded-md h-full">
                <p className="text-slate-400 text-xs">{post._id.getTimestamp().toLocaleString()}</p>
                <Link href={`/posts/show/${post._id.toString()}`} className="block text-xl font-semibold mb-4">{post.title}</Link>
                <p className="text-sm">{post.content}</p>
            </div>
        </div>
    )
}

export default BlogPost