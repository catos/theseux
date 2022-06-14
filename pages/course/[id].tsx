import { Course } from '@prisma/client'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Button from '../../components/ui/button'
import Form from '../../components/ui/form'
import Input from '../../components/ui/input'
import useForm from '../../lib/use-form'

const getCourse = (key: string, id: string): Promise<Course> => {
  return fetch(`/api/courses/${id}`).then(res => res.json())
}

const updateCourse = (id: string, course: Course): Promise<Course> => {
  return fetch(`/api/courses/${id}`, {
    method: "POST",
    body: JSON.stringify(course)
  }).then(res => res.json())
}

const initalCourse: Course = {
  Id: -1,
  Guid: "",
  ExternalId: -1,
  Version: -1,
  State: -1,
  HasJournal: false,
  Name: "",
  Created: new Date(),
  Thumbnail: "",
  Ingress: "",
  Information: "",
  CategoryType: -1,
  CertificateType: -1,
  CertificateTemplate: "",
  SummaryContent: "",
  Hours: -1,
  Price: -1,
  PaymentPosition: -1,
  PaymentChapterNumber: -1,
  PaymentPageNumber: -1,
  CreatedBy: "",
  HTMLMeta: "",
  CourseCategoryId: -1,
  LastModified: new Date(),
  ApprovedDate: new Date(),
  ApprovedText: "",
  // CourseCategory: "",
  // CourseChapter: "",
  // CourseResourceRelation: "",
  // History: [],
  // Session: [],
}

const Page: NextPage = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { data: course, error, mutate } = useSWR(["course", id], getCourse)
  const { values, handleSubmit, handleChange, isLoading } = useForm<Course | undefined>(
    course ?? initalCourse,
    async (values: Course) => {
      console.log("values: ", values);
      
      await updateCourse(id, values)
      mutate()
    }
  )
  console.log("isLoading: ", isLoading);
  

  if (error) return <div>An error occured.</div>
  if (!course) return <div>Loading ...</div>

  return (
    <div>
      <pre>
        {JSON.stringify(values, null, 2)}
      </pre>

      <Form onSubmit={handleSubmit}>
        <Input type="text" name="Name" label="Name" onChange={handleChange} value={values?.Name} />
        <Button color="primary" type="submit">{isLoading ? "Saving..." : "Save"}</Button>
      </Form>
    </div>
  )
}

export default Page
