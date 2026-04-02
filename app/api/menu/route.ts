import { NextResponse } from "next/server"
import { getMenuItems } from "@/lib/menu"

export async function GET() {
  try {
    const items = await getMenuItems()
    return NextResponse.json(items)
  } catch (error) {
    console.error("Menu API error:", error)
    return NextResponse.json(
      { error: "Failed to load menu items" },
      { status: 500 }
    )
  }
}