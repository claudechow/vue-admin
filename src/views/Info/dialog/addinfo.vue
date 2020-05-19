<template>
  <el-dialog
    title="新增"
    :visible.sync="dialog_visible"
    @close="close"
    width="580px"
  >
    <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择类型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.name" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          v-model="form.name"
          placeholder="请输入概况"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" @click="dialogFormVisible = false"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { watch, ref, reactive } from "@vue/composition-api";
export default {
  name: "infoDialog",
  props: {
    visible: {
      type: Boolean,
      defualt: false
    }
  },
  setup(props, { emit }) {
    /** ref */

    const dialog_visible = ref(false);
    const formLabelWidth = ref("70px");

    /** reactive */

    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });

    /** methods */

    const close = () => {
      dialog_visible.value = false;
      emit("update:visible", false);
    };
    // watchEffect(() => {
    //   dialog_visible.value = props.visible;
    //   console.log("watch:" + props.visible + dialog_visible.value);
    // });
    // watch(
    //   () => props.visible,
    //   value => {
    //     dialog_visible.value = value;
    //     console.log("watch:props.visible:" + value);
    //     // console.log("watch:" + props.visible + dialog_visible.value);
    //   }
    // );
    // watch(
    //   () => dialog_visible.value,
    //   value => {
    //     console.log("watch:dialog_visible.value:" + value);
    //   }
    watch(
      () => props.visible,
      value => {
        dialog_visible.value = value;
      }
    );
    return {
      // ref
      dialog_visible,
      formLabelWidth,
      // reactive
      form,
      // methods
      close
    };
  }
};
</script>
<style lang="scss" scoped></style>
