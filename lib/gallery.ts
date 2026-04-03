import { GalleryItem } from "./dream-party-types"

const GALLERY_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRL3p2f31agQ7lUjdSy_eZo31FqhWzxPyCC57kVJ9iSSVLn56WKrMXDLRfj18iLJZs9w-urkWN03JM2/pub?gid=1644937167&single=true&output=csv"

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

function csvToGalleryItems(csv: string): GalleryItem[] {
  const lines = csv
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length < 2) {
    console.log("[gallery] CSV has fewer than 2 lines:", lines)
    return []
  }

  // ✅ Strip BOM character Google Sheets sometimes adds to first header
  const headers = parseCSVLine(lines[0]).map((h) =>
    h.trim().toLowerCase().replace(/^\uFEFF/, "").replace(/\r/g, "")
  )

  console.log("[gallery] Detected headers:", headers)

  return lines
    .slice(1)
    .map((line, index) => {
      const values = parseCSVLine(line)
      const row: Record<string, string> = {}

      headers.forEach((header, i) => {
        row[header] = values[i]?.trim().replace(/\r/g, "") ?? ""
      })

      // ✅ Try common column name variants for img
      const imgValue =
        row.img ||
        row.image ||
        row.url ||
        row.imageurl ||
        row["image url"] ||
        row.photo ||
        ""

      // ✅ Try common column name variants for title
      const titleValue = row.title || row.name || row.caption || ""

      // ✅ Fallback id to index+1 if missing or 0
      const idValue = Number(row.id) || index + 1

      return {
        id: idValue,
        img: imgValue,
        title: titleValue,
      }
    })
    // ✅ Only filter out rows with no image — don't require id
    .filter((item) => item.img !== "")
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const res = await fetch(GALLERY_SHEET_CSV_URL, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch gallery sheet: ${res.status}`)
  }

  const csv = await res.text()

  console.log("[gallery] Raw CSV preview:", csv.slice(0, 300))

  const items = csvToGalleryItems(csv)

  console.log("[gallery] Parsed item count:", items.length)
  console.log("[gallery] First item:", items[0])

  return items
}