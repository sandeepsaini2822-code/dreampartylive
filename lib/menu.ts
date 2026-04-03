export type MenuItem = {
  id: number
  category: string
  tag: string
  name: string
  desc: string
  price: number
  img: string
  available?: string
}

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRL3p2f31agQ7lUjdSy_eZo31FqhWzxPyCC57kVJ9iSSVLn56WKrMXDLRfj18iLJZs9w-urkWN03JM2/pub?gid=0&single=true&output=csv"

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const next = line[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      current += '"'
      i++
    } else if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current)
      current = ""
    } else {
      current += char
    }
  }

  result.push(current)
  return result
}

function csvToMenuItems(csv: string): MenuItem[] {
  const lines = csv
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase())

  return lines
    .slice(1)
    .map((line) => {
      const values = parseCSVLine(line)
      const row: Record<string, string> = {}

      headers.forEach((header, index) => {
        row[header] = values[index]?.trim() ?? ""
      })

      return {
        id: Number(row.id || 0),
        category: row.category || "",
        tag: row.tag || "",
        name: row.name || "",
        desc: row.desc || "",
        price: Number(row.price || 0),
        img: row.img || "",
        available: (row.available || "yes").toLowerCase(),
      }
    })
    .filter((item) => item.id && item.name)
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const res = await fetch(SHEET_CSV_URL, {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch Google Sheet menu")
  }

  const csv = await res.text()
  return csvToMenuItems(csv)
}