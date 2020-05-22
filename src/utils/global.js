import { MessageBox } from "element-ui";

export function global() {
  const confirm = params => {
    MessageBox.confirm(params.content, params.tip || "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: params.type || "warning",
      center: true
    })
      .then(() => {
        params.function && params.function(params.id || "");
      })
      .catch(() => {
        params.catchFunction && params.catchFunction();
      });
  };

  return {
    confirm
  };
}
