import { Course, PrismaClient } from "@prisma/client"
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

  console.log("Request!", req.method, id)

  switch (req.method) {
    case "POST":
      await update(req.body)
      break
    default:
      const course = await get(parseInt(id))
      if (!course) {
        res.status(404).send({})
      } else {
        res.json(course)
      }
      break
  }
}

// TODO: move functions below to a service ?

async function get(id: number) {
  return await prisma.course.findUnique({
    where: { Id: id },
  })
}

async function update(body: any) {
  const { Id, ...update } = JSON.parse(body) as Course
  // const update: Omit<Course, "Id"> = course
  console.log("PUT!!, body: ", update)
  await prisma.course.update({
    where: { Id: Id },
    data: update,
  })
}
