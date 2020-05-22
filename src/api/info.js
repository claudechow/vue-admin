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
 *  一级分类添加
 */
export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
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
