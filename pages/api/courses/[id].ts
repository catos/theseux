import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { isNumeric } from "../../../utils/is-numeric"

const prisma = new PrismaClient()


export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  
  if (!id || !isNumeric(id)) {
    return res.json(null)
  }

  const course = await prisma.course.findUnique({
    where: { Id: parseInt(id) },
  })

  res.json(course)
}
