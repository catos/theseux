import { Course } from '@prisma/client'
import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'

const getCourses = (): Promise<Course[]> => fetch("/api/courses").then(res => res.json())

const Page: NextPage = () => {
  const { data: courses, error } = useSWR('courses', getCourses)
  if (error) return <div>An error occured.</div>
  if (!courses) return <div>Loading ...</div>

  return (
    <div>
      {courses.map(course =>
        <li key={course.Id}>
          <Link href={`/course/${course.Id}`}><a>{course.Name}</a></Link>
        </li>
      )}
    </div>
  )
}

export default Page
