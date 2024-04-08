import React from 'react'
import blogPosts from '@/globalData/blogPosts.json'
import Link from 'next/link'

export default function RecentBlogPosts({heading}) {
    return (
        <div className="py-40">
            <h2 className='text-2xl font-medium max-w-4xl mx-auto'>{heading}</h2>
            <div className='grid grid-cols-3 mt-4 mx-auto max-w-4xl gap-10'>
                {blogPosts.map((post) => {
                    return (
                        <Link href={`/blog-posts/${post.slug}`} className=' bg-gray-100 shadow rounded-md p-4'>
                            <h3 className='text-xl'>{post.title}</h3>
                        </Link>

                    )
                })}
            </div>
        </div>
    )
}