let UUID = 0

export default function UniqueID(): string {
  const getID = (): string => {
    UUID++
    return UUID.toString()
  }

  return getID()
}

