/**
 * Utility function to get the basePath
 * Since we're using basePath: '/valentine' in next.config.mjs
 * This helper ensures all asset and public paths include the repository name
 */

const BASE_PATH = '/valentine'

/**
 * Prepends the basePath to a given path
 * @param path - The path to prepend the basePath to
 * @returns The full path with basePath prefix
 */
export function getBasePath(path: string): string {
  // If path already starts with the basePath, return it as is
  if (path.startsWith(BASE_PATH)) {
    return path
  }
  
  // Remove leading slash if present to avoid double slashes
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  return `${BASE_PATH}${normalizedPath}`
}

/**
 * Get the basePath string
 */
export function getBasePathString(): string {
  return BASE_PATH
}
