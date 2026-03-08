export interface User {
  name: string
  email: string
  password: string
}

export const users: User[] = []

export function addUser(user: User) {
  users.push(user)
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export function getAllEmails(): string[] {
  return users.map((u) => u.email)
}
