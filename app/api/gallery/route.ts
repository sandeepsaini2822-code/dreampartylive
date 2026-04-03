import { NextResponse } from "next/server"

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

function parseGalleryCSV(csv: string) {
  const lines = csv
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)

  if (lines.length < 2) return []

  // Strip BOM + carriage returns from headers
  const headers = parseCSVLine(lines[0]).map((h) =>
    h.trim().toLowerCase().replace(/^\uFEFF/, "").replace(/\r/g, "")
  )

  console.log("[gallery] Headers:", headers)

  return lines
    .slice(1)
    .map((line, index) => {
      const values = parseCSVLine(line)
      const row: Record<string, string> = {}
      headers.forEach((h, i) => {
        row[h] = values[i]?.trim().replace(/\r/g, "") ?? ""
      })

      const img =
        row.img || row.image || row.url || row.imageurl || row.photo || ""
      const title = row.title || row.name || row.caption || ""
      const id = Number(row.id) || index + 1

      return { id, img, title }
    })
    .filter((item) => item.img !== "")
}

export async function GET() {
  try {
    const res = await fetch(GALLERY_SHEET_CSV_URL, {
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    })

    if (!res.ok) {
      console.error("[gallery] Sheet fetch failed:", res.status, res.statusText)
      return NextResponse.json(
        { error: `Sheet responded with ${res.status}` },
        { status: 500 }
      )
    }

    const csv = await res.text()
    console.log("[gallery] CSV preview:", csv.slice(0, 300))

    const items = parseGalleryCSV(csv)
    console.log("[gallery] Parsed items:", items.length)
    if (items.length > 0) console.log("[gallery] First item:", items[0])

    return NextResponse.json(items)
  } catch (err) {
    console.error("[gallery] Fetch error:", err)
    return NextResponse.json(
      { error: "Failed to fetch gallery" },
      { status: 500 }
    )
  }
}