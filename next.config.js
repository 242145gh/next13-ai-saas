/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com"
    ]
  },
  api: {
    bodyParser: {
      sizeLimit: '1mb', // Set the limit according to your needs
    },
  }
}

module.exports = nextConfig
