import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = 'https://devops.danleyb2.dev/api/snippets/'

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Token d12fbdb28992635a9d86e043e503c32eb71717c7'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }

    const data = await response.json()
    res.status(response.status).json(data)
  } catch (error) {
    console.error('Error in API handler:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
