import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from '@/components/Layout'
import { sortByDate } from '@/utils/index'

// fs must be used in server side only because on client side it will lead to error
const files = fs.readdirSync(path.join('posts'))

export function getPosts() {
    const posts = files.map(filename => {
        const slug = filename.replace('.md', '')

        const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
        const { data: frontmatter } = matter(markdownWithMeta)
        return {
            slug,
            frontmatter,
        }
    })
    return posts.sort(sortByDate)
}