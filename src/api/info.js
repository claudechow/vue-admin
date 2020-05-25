import service from "@/utils/request";
/**
 *  列表
 */
/**
 *  新增
 */
/**
 *  编辑
 */
/**
 *  删除
 */
/**
 *  添加一级分类
 */
export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data: data
  });
}
/**
 *  修改分类
 */
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data: data
  });
}
/**
 *  删除一级分类
 */
export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data: data
  });
}
/**
 *  获取一级分类
 */
export function GetCategoryAll(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data: data
  });
}
