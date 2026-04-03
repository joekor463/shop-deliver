import { CatalogProps } from "@/types/catalog";
import { getDB } from "../../../../utils/api-routes";
import { NextResponse } from "next/server";
import { filter } from "motion/react-client";
export const revalidate = 3600;

export async function GET() {
  try {
    const db = await getDB();
    const articles = await db.collection("articles").find().toArray();
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Ошибка сервера:", error);
    return NextResponse.json({ message: "Ошибка при загрузке статей" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDB();
    const updatedategories: CatalogProps[] = await request.json()

    const bulkOps = updatedCategories.map((category) => ({
      updateOne: {
        filter: {_id: new ObjectId(category._id)},
        update: {
          $set: {
            order: category.order,
            title: category.title,
            img: category.img,
            colSpan: category.colSpan,
            tabletColSpan: category.tabletColSpan,
            mobileColSpan: category.mobileColSpan
          }
        }
      }
    }))

    const result = await db.collection("catalog").bulkWrite(bulkOps)

    return NextResponse.json({
      success: true,
      updatedCount: result.modifiedCount
    })
  } catch (error) {
    console.error("Ошибка обновления порядка категорий:", error);
    return NextResponse.json({ message: "Ошибка обновления порядка категорий" }, 
                             { status: 500 });
  }
}