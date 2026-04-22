import { useState, useCallback } from "react"

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [formData, setFormData] = useState<T>(initialValues)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData(initialValues)
  }, [initialValues])

  const setValues = useCallback((values: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...values }))
  }, [])

  return {
    formData,
    setFormData,
    handleChange,
    setFieldValue,
    resetForm,
    setValues,
  }
}
