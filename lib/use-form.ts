import * as React from 'react'

// TODO: customFormHook: https://www.telerik.com/blogs/how-to-build-custom-forms-react-hooks
export type OnSubmitType = (values: any, error: any) => void //Promise<void>
export type StatusType = 'idle' | 'pending' | 'rejected' | 'success'
export type ChangeEventType = HTMLInputElement | { name?: string; value: any }

/**
 * TODO: remove | undefined (check login)
 */
function useForm<T>(initialValues: T | undefined, onSubmit: OnSubmitType) {
  const [values, setValues] = React.useState<T | undefined>(initialValues)
  const [errors] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)

  // TODO: why telerik !?!? const formRendered = React.useRef(true)
  React.useEffect(() => {
    // console.log("setValues", initialValues)
    setValues(initialValues)
    // formRendered.current = false
  }, [initialValues])

  const handleSubmit = async (event: any) => {
    if (event) {
      event.preventDefault()
    }

    setIsLoading(true)
    console.log("setIsLoading(true)");
    
    // TODO: support validation ?
    onSubmit(values, errors)
    
    setIsLoading(false)
    console.log("setIsLoading(false)");
  }

  const handleChange = (event: React.ChangeEvent<ChangeEventType>) => {
    const { name, value } = event.target
    if (name && values) {
      setValues({
        ...values,
        [name]: value,
      })
    }
  }

  return {
    values,
    setValues,
    handleSubmit,
    handleChange,
    isLoading
  }
}

export default useForm