import { Course } from '@prisma/client'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Input from '../../components/ui/input'
import useForm from '../../lib/use-form'

const getCourse = (key: string, id: string): Promise<Course> => {
  return fetch(`/api/courses/${id}`).then(res => res.json())
}

const updateCourse = (id: string, course: Course): Promise<Course> => {
  return fetch(`/api/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(course)
  }).then(res => res.json())
}

const Page: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { data: course, error, mutate } = useSWR(["course", id], getCourse)
  const { values, handleSubmit, handleChange } = useForm<Course | undefined>(
    course,
    async (values: Course) => {
      console.log("values: ", values);
      
      await updateCourse(id, values)
      mutate(values)
    }
  )

  if (error) return <div>An error occured.</div>
  if (!course) return <div>Loading ...</div>

  return (
    <div>
      <pre>
        {JSON.stringify(course, null, 2)}
      </pre>

      <form onSubmit={handleSubmit}>
        <Input type="text" name="Name" label="Name" onChange={handleChange} value={values?.Name} />
        <button type="submit">Save</button>
      </form>

      {/* <button onClick={e => handleClick()}>Update!</button> */}
    </div>
  )
}

export default Page
