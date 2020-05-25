import { MessageBox } from "element-ui";
/**
 * params
 * content 消息框内容
 * tip 标题
 * type 消息类型 success 成功 warning 警告
 * param 附带参数-回调方法使用
 * function 执行成功后的回调方法
 * catchFunction 执行失败后的方法
 */
export function global() {
  const confirm = params => {
    MessageBox.confirm(params.content, params.tip || "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: params.type || "warning",
      center: true
    })
      .then(() => {
        params.function && params.function(params.param || "");
      })
      .catch(() => {
        params.catchFunction && params.catchFunction();
      });
  };

  return {
    confirm
  };
}
