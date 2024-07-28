"use server";
import { db } from "@/lib/db";



  export const getAllCategories = async () => {
    try {
      const categories = await db.category.findMany();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

}


  export const getCategoryTitle = async (categoryId : string)  => {
   
  
   
     const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        title: true, // Select only the title field
      }
        
      });
   
  
      return category ? category.title : null;
  };