import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = {
    take: 20,
    // select: {
    //   Id: true,
    //   Guid: true,
    //   Name: true,
    //   ParentId: true
    // },
    include: {
      CourseCategory: true
    },
  }

  const categories = await prisma.courseCategory.findMany(query)
  res.json(categories)
}
