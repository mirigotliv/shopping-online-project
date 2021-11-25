export class ProductModel {
    public id: number
    public productName: string
    public price: number
    public categoryId: string
    public categoryName: string;
    public fileImage: string;
    public image: FileList

    public static convertToFormData(product: ProductModel): FormData {
        const myFormData = new FormData();
        myFormData.append("productName", product.productName);
        myFormData.append("price", product.price.toString());
        myFormData.append("categoryId", product.categoryId.toString());
        myFormData.append("categoryName", product.categoryName);
        myFormData.append("image", product.image.item(0));
        return myFormData;
    }
}






