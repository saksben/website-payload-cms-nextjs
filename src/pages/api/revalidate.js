export default async function (req, res) {
    const slug = req.query.slug

    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.FRONTEND_SECRET) {
        return res.status(401).json({ message: 'Invalid token' })
    } else if (!slug) {
        return res.status(400).json({ message: 'Missing slug' })
    }

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate(`/${slug.replace(/index/, '')}`)
        return res.json({ revalidated: true })
    } catch (err) {
        console.log(err)
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}