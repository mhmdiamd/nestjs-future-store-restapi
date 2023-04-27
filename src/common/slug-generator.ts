export const generateSlug = (words: string, id: string) : string => {
  const wordsToString = words.toLocaleLowerCase().split(' ')
  wordsToString.join("-")

  console.log(wordsToString)
  return `${wordsToString}-${id}` 
}