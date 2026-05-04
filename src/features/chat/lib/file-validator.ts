const MAX_FILE_SIZE = 20 * 1024 * 1024

export const validateFile = (file: File) => {
  if (!file) return false
  if (file.size <= 0) return false
  if (file.size > MAX_FILE_SIZE) return false

  return true
}
