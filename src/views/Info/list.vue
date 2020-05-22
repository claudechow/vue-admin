<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label>分类：</label>
          <div class="warp-content">
            <el-select
              v-model="category_value"
              placeholder="请选择"
              style="100%"
            >
              <el-option
                v-for="item in category_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-date-picker
              style="width: 100%;"
              v-model="date_value"
              type="datetimerange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-work">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-select v-model="search_key" placeholder="请选择" style="100%">
              <el-option
                v-for="item in search_options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="search_keyWork"
          placeholder="请输入内容"
          style="width: 100%;"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger">搜索</el-button>
      </el-col>
      <el-col :span="5">
        <el-button
          type="danger"
          class="pull-right"
          @click="add_dialog_visible = true"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <div class="black-space-30"></div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="750"></el-table-column>
      <el-table-column
        prop="categoryId"
        label="类型"
        width="130"
      ></el-table-column>
      <el-table-column
        prop="createDate"
        label="日期"
        width="237"
      ></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteItem(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30"></div>
    <!--底部分页-->
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAllItem">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          backgroundy
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <DialogInfo :visible.sync="add_dialog_visible" />
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
import DialogInfo from "./dialog/addinfo";
import { global } from "@/utils/global";
export default {
  name: "infoListView",
  components: { DialogInfo },
  setup() {
    const { confirm } = global();
    const category_options = reactive([
      {
        value: "1",
        label: "国际信息"
      },
      {
        value: "2",
        label: "国内信息"
      },
      {
        value: "3",
        label: "行业信息"
      }
    ]);
    const search_options = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
    const tableData = reactive([
      {
        title: "标题",
        categoryId: "类别",
        createDate: "2016-05-02",
        user: "王小虎"
      },
      {
        title: "标题",
        categoryId: "类别",
        createDate: "2016-05-02",
        user: "王小虎"
      },
      {
        title: "标题",
        categoryId: "类别",
        createDate: "2016-05-02",
        user: "王小虎"
      },
      {
        title: "标题",
        categoryId: "类别",
        createDate: "2016-05-02",
        user: "王小虎"
      }
    ]);
    const category_value = ref("");
    const date_value = ref("");
    const search_key = ref("id");
    const search_keyWork = ref("");
    const add_dialog_visible = ref(false);

    const handleEdit = (index, row) => {
      console.log(index, row);
    };
    const deleteItem = (index, row) => {
      console.log(index, row);
      confirm({
        content: "确认删除当前信息，确认后将无法恢复！！",
        tip: "警告",
        id: "one",
        function: confirmDelete
      });
    };
    const deleteAllItem = (index, row) => {
      console.log(index, row);
      confirm({
        content: "删除全部，确认后将无法恢复！！",
        tip: "警告",
        id: "all",
        function: confirmDelete
      });
    };
    const confirmDelete = value => {
      console.log(value);
    };

    return {
      category_options,
      category_value,
      date_value,
      search_options,
      search_key,
      search_keyWork,
      add_dialog_visible,
      tableData,
      handleEdit,
      deleteItem,
      deleteAllItem,
      confirmDelete
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-work {
    @include labelDom(right, 99, 40);
  }
}
</style>
