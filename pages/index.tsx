import { Course } from '@prisma/client'
import type { NextPage } from 'next'
import useSWR from 'swr'
import styles from '../styles/Home.module.css'

const getCourses = (): Promise<Course[]> => fetch("/api/courses").then(res => res.json())

const Home: NextPage = () => {
  const { data: courses, error } = useSWR('/api/posts', getCourses)
  if (error) return <div>An error occured.</div>
  if (!courses) return <div>Loading ...</div>

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        {courses.map(course =>
          <div key={course.Id}>
            <h1>{course.Name}</h1>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        ...
      </footer>
    </div>
  )
}

export default Home
