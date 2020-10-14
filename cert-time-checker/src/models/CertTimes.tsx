import { firestore } from "firebase"

export type TCertTimes =
  | {
      certMinutes: number
      date: firestore.Timestamp
      instructor: string
      title: string
    }
  | undefined
