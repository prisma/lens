import { useEffect, useState } from "react"

/**
 * A hook for resolving Options that are provided as a Promise.
 *
 * @param options
 * @returns
 */
export function useAsyncOptions<T>(options: T[] | Promise<T[]>): {
  loading: boolean
  error: Error | undefined
  options: T[]
} {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [resolvedOptions, setResolvedOptions] = useState<T[]>([])

  useEffect(() => {
    if (Array.isArray(options)) {
      setResolvedOptions(options)
      return
    }

    setLoading(true)
    options
      .then((o) => setResolvedOptions(o))
      .catch((e) => setError(e))
      .finally(() => setLoading(false))
  }, [options])

  return { loading, error, options: resolvedOptions }
}
