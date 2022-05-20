import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GROUPBY
  // const courses = await prisma.course.groupBy({
  //   by: ["Guid"],
  //   where: {
  //     CategoryType: 1,
  //   },
  //   _count: {
  //     _all: true,
  //   },
  //   _max: {
  //     select: { version: }
  //   }
  // })

  // DISTINCT
  // const courses = await prisma.course.findMany({
  //   where: {
  //     CategoryType: 1
  //   },
  //   distinct: ['Guid'],
  //   select: {
  //     Id: true,
  //     Guid: true,
  //     Name: true
  //   },
  // })

  const courses = await prisma.course.findMany({
    where: {
      CategoryType: 1,
    },
    distinct: ["Guid"],
    orderBy: {
      Version: "desc",
    },
    select: {
      Id: true,
      Name: true,
      Guid: true,
      Thumbnail: true,
      Ingress: true,
      CourseCategoryId: true,
      LastModified: true
    },
  })

  res.json(courses)
}
