<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category-warp">
            <div class="category">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
            <div class="category">
              <h4>
                <svg-icon icon-class="plus"></svg-icon>
                新闻
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button type="success" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </h4>
              <ul>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  国内
                  <div class="button-group">
                    <el-button type="danger" size="mini" round>编辑</el-button>
                    <el-button size="mini" round>删除</el-button>
                  </div>
                </li>
                <li>
                  国内
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
            <el-form class="from-wrap" ref="categoryFrom" label-width="142px">
              <el-form-item label="一级分类名称">
                <el-input v-model="form.categoryName"></el-input>
              </el-form-item>
              <el-form-item label="二级分类名称">
                <el-input v-model="form.secCategoryName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" round>确定</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "infoCategoryView",
  setup() {
    const form = reactive({
      categoryName: "",
      secCategoryName: ""
    });
    return {
      form
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
