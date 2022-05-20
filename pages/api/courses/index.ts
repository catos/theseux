import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const name = req.query.name as string
  const guid = req.query.guid as string
  const category = req.query.category as string

  const query = {
    take: 20,
    select: {
      Id: true,
      Name: true,
      Guid: true,
      CourseCategoryId: true
    },
    // include: {
    //   CourseCategory: true
    // },
    ...(name ? { where: { Name: { startsWith: name } } } : undefined),
    ...(guid ? { where: { Guid: guid } } : undefined),
    ...(category ? { where: { category: category } } : undefined),
  }

  const courses = await prisma.course.findMany(query)
  res.json(courses)
}
