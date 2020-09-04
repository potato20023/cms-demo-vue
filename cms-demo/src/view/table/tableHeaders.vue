<template>
  <div class="container">
    <h2>多级表头的表格</h2>
    <el-button @click="getExcel" style="mrgin-bottom:20px">导出表格</el-button>
    <el-table border :data="userList">
      <el-table-column prop="userNum" label="编号" width="120" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
      <el-table-column label="用户信息" align="center">
        <el-table-column prop="phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="job" label="行业" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="用户状态" align="center">
        <el-table-column prop="createTime" label="入库时间" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state == 1" type="info">正常</el-tag>
            <el-tag v-if="scope.row.state == 2" type="danger">异常</el-tag>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="from" label="录入方式" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserList } from "@/api/mode";
export default {
  name: "",
  data() {
    return {
      userList: [],
    };
  },
  computed: {
    ...mapGetters([""]),
  },
  components: {},
  mounted() {
    this.getUserLists();
  },
  methods: {
    // 获取数据列表
    getUserLists() {
      let data = {
        limit: 1,
        offset: 10,
      };
      getUserList().then((res) => {
        if (res.data) {
          this.userList = res.data.list;
        }
      });
    },
    // 导出表格
    getExcel() {
      import("@/vendor/Export2Excel").then((excel) => {
        const multiHeader = [["编号","用户名","用户信息","","","用户状态","","录入方式"]];
        const header = ["", "", "电话", "行业", "地址", "入库时间", "状态", ""];
        const filterVal = ["userNum","userName","phone","job","address","createTime","state","from"];
        const list = this.userList;
        const data = this.formatJson(filterVal, list);
        const merges = ["A1:A2", "B1:B2", "C1:E1", "F1:G1", "H1:H2"];

        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data
        })
      });
      
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
  watch: {},
};
</script>
<style lang='scss' scoped>
.container {
  padding: 20px;
  h2 {
    margin-bottom: 20px;
  }
}
</style>