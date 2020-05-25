<template>
  <div id="category">
    <el-button type="danger" @click="handlerAddFirstCategory"
      >添加一级分类</el-button
    >
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-warp">
            <div
              class="category"
              v-for="category_item in category.item"
              :key="category_item.id"
            >
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                {{ category_item.category_name }}
                <div class="button-group">
                  <el-button
                    type="danger"
                    size="mini"
                    round
                    @click="handlerEditFirstCategory(category_item)"
                    >编辑</el-button
                  >
                  <el-button type="success" size="mini" round
                    >添加子集</el-button
                  >
                  <el-button
                    size="mini"
                    round
                    @click="handlerdeleteFirstCategory(category_item)"
                    >删除</el-button
                  >
                </div>
              </h4>
              <ul v-if="category_item.children">
                <li
                  v-for="children_item in category_item.children"
                  :key="children_item.id"
                >
                  {{ children_item.category_name }}
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <div>
            <el-form
              :model="categoryFrom"
              class="from-wrap"
              ref="categoryFrom"
              label-width="142px"
            >
              <!-- 一级分类 -->
              <el-form-item
                label="一级分类名称"
                v-if="addfirstcategory_visible"
              >
                <el-input
                  v-model="categoryFrom.firstcategoryName"
                  :disabled="addfirstcategory_disabled"
                ></el-input>
              </el-form-item>
              <!-- 二级分类 -->
              <el-form-item label="二级分类名称" v-if="addseccategory_visible">
                <el-input
                  v-model="categoryFrom.secCategoryName"
                  :disabled="addseccategory_disabled"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  round
                  @click="subCategory"
                  :loading="sub_btn_isloading"
                  :disabled="addcategorybtn_disabled"
                  >确定</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {
  AddFirstCategory,
  GetCategoryAll,
  DeleteCategory,
  EditCategory
} from "@/api/info";
import { reactive, ref, onMounted } from "@vue/composition-api";
import { global } from "@/utils/global";
export default {
  name: "infoCategoryView",
  setup(props, { root }) {
    const { confirm } = global();
    const addfirstcategory_visible = ref(true);
    const addseccategory_visible = ref(true);
    const addfirstcategory_disabled = ref(true);
    const addseccategory_disabled = ref(true);
    const addcategorybtn_disabled = ref(true);
    const sub_btn_isloading = ref(false);
    const sub_btn_type = ref("");
    const category = reactive({ item: [] });
    const categoryFrom = reactive({
      firstcategoryName: "",
      secCategoryName: ""
    });
    const getategoryAll = () => {
      GetCategoryAll()
        .then(response => {
          let data = response.data;
          category.item = data.data;
        })
        .catch(error => {
          console.log(error);
        });
    };
    const subCategory = () => {
      switch (sub_btn_type.value) {
        case "add_firtstCategory":
          addFirstCategory();
          break;
        case "edit_firtstCategory":
          editFirstCategory();
          break;
      }
    };
    /**
     * 添加一级分类
     */
    const handlerAddFirstCategory = () => {
      addfirstcategory_visible.value = true;
      addseccategory_visible.value = false;
      addfirstcategory_disabled.value = false;
      addcategorybtn_disabled.value = false;
      sub_btn_type.value = "add_firtstCategory";
    };
    const addFirstCategory = () => {
      if (!categoryFrom.firstcategoryName) {
        root.$message({
          message: "一级分类名称不能为空",
          type: "error"
        });
        return false;
      }
      sub_btn_isloading.value = true;
      let requestData = {
        categoryName: categoryFrom.firstcategoryName
      };
      // 调用接口
      // 添加一级分类
      AddFirstCategory(requestData)
        .then(response => {
          let data = response.data;
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: "success"
            });
            /**
             * 两种处理方法
             * 1、请求接获取分类接口（缺点：浪费资源）
             * 2、直接push，请求接口后返回的数据
             */
            category.item.push(data.data);
            // 数组的方法，添加数组末尾
          }
          categoryFrom.firstcategoryName = "";
          categoryFrom.secCategoryName = "";
          sub_btn_isloading.value = false;
        })
        .catch(error => {
          console.log(error);
          sub_btn_isloading.value = false;
          categoryFrom.firstcategoryName = "";
          categoryFrom.secCategoryName = "";
        });
    };
    /**
     * 编辑一级分类
     */
    const handlerEditFirstCategory = category_item => {
      categoryFrom.firstcategoryName = category_item.category_name;
      addseccategory_visible.value = false;
      addfirstcategory_disabled.value = false;
      addcategorybtn_disabled.value = false;
      sub_btn_type.value = "edit_firtstCategory";
      category.current = category_item;
    };
    const editFirstCategory = () => {
      if (!categoryFrom.firstcategoryName) {
        root.$message({
          message: "一级分类名称不能为空",
          type: "error"
        });
        return false;
      }
      if (category.current.length == 0) {
        root.$message({
          message: "请选择要修改的一级分类",
          type: "error"
        });
        return false;
      }
      sub_btn_isloading.value = true;
      let requestData = {
        id: category.current.id,
        categoryName: categoryFrom.firstcategoryName
      };
      EditCategory(requestData)
        .then(response => {
          let data = response.data;
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: "success"
            });
            category.current.category_name = data.data.data.categoryName;
            categoryFrom.firstcategoryName = "";
            category.current = [];
            sub_btn_isloading.value = false;
          }
        })
        .catch(error => {
          console.log(error);
          sub_btn_isloading.value = false;
        });
    };
    /**
     * 删除一级分类
     */
    const handlerdeleteFirstCategory = category_item => {
      confirm({
        content: `是否删除一级分类[${category_item.category_name}]?删除后无法恢复！`,
        tip: "警告",
        param: category_item,
        function: deleteFirstCategory
      });
    };
    const deleteFirstCategory = category_item => {
      console.log(category_item.category_name);
      let requestData = {
        categoryId: category_item.id
      };
      DeleteCategory(requestData)
        .then(response => {
          let data = response.data;
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: "success"
            });
            // 操作数组
            /**
             * 两个参数的时候是删除，三个参数是替换\插入
             * splice(指定起始位置, 数据的数量, 新数据)
             * splice(1, 2, {})
             * [
             * {id: "132", category_name: "sdf df "},
             * {}
             * ]
             */
            /**
             * es6 findIndex
             * filter
             */
            // let index = category.item.findIndex(item => item.id == deleteId.value);
            // // 删除数组指定元素
            // category.item.splice(index, 1);
            /**
             * 按条件过滤，满足条件的数组结果
             */
            let newData = category.item.filter(
              item => item.id != requestData.categoryId
            );
            category.item = newData;
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    //挂载完成后自动执行
    onMounted(() => {
      getategoryAll();
    });
    return {
      addfirstcategory_visible,
      addseccategory_visible,
      sub_btn_isloading,
      addfirstcategory_disabled,
      addseccategory_disabled,
      addcategorybtn_disabled,
      category,
      categoryFrom,
      subCategory,
      getategoryAll,
      handlerAddFirstCategory,
      addFirstCategory,
      handlerEditFirstCategory,
      editFirstCategory,
      handlerdeleteFirstCategory,
      deleteFirstCategory
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.category-warp {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 20px;
    }
  }
}
.category {
  line-height: 44px;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 18px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
    svg {
      position: absolute;
      left: 10px;
      top: 12px;
      font-size: 17px;
      background-color: #fff;
    }
  }
  li {
    position: relative;
    padding-left: 40px;
    margin-left: 20px;
    &:before {
      content: "";
      position: absolute;
      width: 32px;
      left: 0;
      top: 21px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    &:hover {
      @include webkit(transition, all 0.7s ease 0s);
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  right: 11px;
  z-index: 2;
  top: -1px;
  button {
    font-size: 12px;
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.from-wrap {
  width: 410px;
  padding-top: 26px;
}
.hr-e9e9e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
}
</style>
