// Simple unique id generator composable
let uid = 0

export function useUniqueId(prefix = 'uid'): string {
  // Generate monotonic unique id for form inputs/labels
  uid += 1
  return `${prefix}-${uid}`
}
