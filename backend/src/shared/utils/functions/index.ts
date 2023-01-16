export const getLastWeeksDate = (date?: Date) => {
  const dateToCompare = date ? date : new Date()

  const day = date ? -5 : 7
  return new Date(dateToCompare.getTime() - day * 24 * 60 * 60 * 1000)
}

export const handleVerifyLastWeek = (date: Date) => {
  const now = new Date()
  let countDays = 0
  while (date < now) {
    date.setDate(date.getDate() + 1)
    countDays++
  }
  if (countDays <= 7 && countDays >= 0) {
    return true
  }

  return false
}
