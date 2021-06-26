import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Layout from '../../components/Layout'
import matter from 'gray-matter'
import Post from '../../components/Post'
import sortByDate from '../../utils'

export default function BlogPage({ posts }) {
    console.log(posts)
    return (
        <Layout>
            <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </div>

        </Layout>
    )
}

export async function getStaticProps() {

    // fs must be used in server side only because on client side it will lead to error
    const files = fs.readdirSync(path.join('posts'))

    const posts = files.map(filename => {
        const slug = filename.replace('.md', '')

        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
        const { data: frontmatter } = matter(markdownWithMeta)
        return {
            slug,
            frontmatter,
        }
    })

    return {
        props: {
            posts: posts.sort(sortByDate),
        }
    }
}
