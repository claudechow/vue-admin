<template>
  <div id="category">
    <el-button type="danger" @click="addFirstCategory">添加一级分类</el-button>
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
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
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
              <el-form-item
                label="一级分类名称"
                v-if="addfirstcategory_visible"
              >
                <el-input v-model="categoryFrom.firstcategoryName"></el-input>
              </el-form-item>
              <el-form-item label="二级分类名称" v-if="addseccategory_visible">
                <el-input v-model="categoryFrom.secCategoryName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  round
                  @click="addFirstCategorySub"
                  :loading="sub_btn_isloading"
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
import { AddFirstCategory, GetCategoryAll } from "@/api/info";
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
  name: "infoCategoryView",
  setup(props, { root }) {
    const addfirstcategory_visible = ref(true);
    const addseccategory_visible = ref(true);
    const sub_btn_isloading = ref(false);
    const category = reactive({ item: [] });
    const categoryFrom = reactive({
      firstcategoryName: "",
      secCategoryName: ""
    });
    const addFirstCategory = () => {
      addfirstcategory_visible.value = true;
      addseccategory_visible.value = false;
    };
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
    const addFirstCategorySub = () => {
      if (!categoryFrom.firstcategoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      sub_btn_isloading.value = true;
      let requestData = {
        categoryName: categoryFrom.firstcategoryName
      };
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
    //挂载完成后自动执行
    onMounted(() => {
      getategoryAll();
    });
    return {
      addfirstcategory_visible,
      addseccategory_visible,
      sub_btn_isloading,
      category,
      categoryFrom,
      getategoryAll,
      addFirstCategory,
      addFirstCategorySub
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
