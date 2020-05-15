<template>
  <div class="user-container">
    <div v-if="ifList" class="user-top">
      <div class="title">用户资料管理</div>
      <ul class="operation">
        <li @click="add">
          <i class="el-icon-plus"></i>
          添加
        </li>
        <li @click="deleteAll">
          <i class="el-icon-delete"></i>
          删除
        </li>
        <li @click="getExcel(userList)">
          <i class="el-icon-s-promotion"></i>
          导出
        </li>
        <li @click="outExe">导出模板</li>
        <li>
          <span>
            <input
              class="input-file"
              type="file"
              @change="exportData"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <button @click="btnClick">导入EXCEL</button>
          </span>
        </li>
      </ul>
    </div>

    <div>
      <el-upload
        class="upload-demo"
        action
        :on-change="handleChange"
        :show-file-list="true"
        :on-remove="handleRemove"
        :file-list="fileListUpload"
        :limit="1"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">批量上传</el-button>
        <div slot="tip" class="el-upload__tip">注：只 能 上 传 xlsx / xls 文 件</div>
      </el-upload>
    </div>

    <!-- 表格 -->
    <div v-if="ifList" class="user-table">
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        style="width:100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="客户编号" prop="userNum"></el-table-column>
        <el-table-column label="客户名字" prop="userName">
          <template slot-scope="scope">
            <span style="color:#347ab8">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="行业" prop="job"></el-table-column>
        <el-table-column label="地址" prop="address" width="240"></el-table-column>
        <el-table-column label="来源" prop="from"></el-table-column>
        <el-table-column label="销售人员" prop="salesman"></el-table-column>
        <el-table-column label="入库时间" prop="createTime"></el-table-column>
        <el-table-column label="状态" prop="state" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.state == 1">
              <i
                style="width:8px;height:8px;border-radius:50%;margin-right:5px;display:inline-block;background-color:#f59370"
              ></i>
              <span>待分配</span>
            </div>
            <div v-if="scope.row.state == 2">
              <i
                style="width:8px;height:8px;border-radius:50%;margin-right:5px;display:inline-block;background-color:#9b58b5"
              ></i>
              <span>抢单中</span>
            </div>
            <div v-if="scope.row.state == 3">
              <i
                style="width:8px;height:8px;border-radius:50%;margin-right:5px;display:inline-block;background-color:#5c9bd1"
              ></i>
              <span>跟踪中</span>
            </div>
            <div v-if="scope.row.state == 4">
              <i
                style="width:8px;height:8px;border-radius:50%;margin-right:5px;display:inline-block;background-color:#52ce9a"
              ></i>
              <span>已成交</span>
            </div>
            <div v-if="scope.row.state == 5">
              <i
                style="width:8px;height:8px;border-radius:50%;margin-right:5px;display:inline-block;background-color:#95a0b2"
              ></i>
              <span>留存</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="跟踪" prop="track" width="60">
          <template slot-scope="scope">
            <span>{{scope.row.track}}天</span>
          </template>
        </el-table-column>
        <el-table-column label="难易度" prop="degree">
          <template slot-scope="scope">
            <i
              class="el-icon-star-on"
              v-for="i in 5"
              :key="i"
              :style="{color:i <= scope.row.degree?'#f2c304' : '#cbc9ca'}"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" class="scope-i">
            <i class="el-icon-edit" @click="handleClick(scope.row)"></i>
            <i class="el-icon-delete" @click="handleDelete(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增或编辑 -->
    <userAdd v-if="!ifList"></userAdd>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserList } from "@/api/mode";
import userAdd from "@/view/permission/userAdd";
export default {
  name: "",
  data() {
    return {
      numList: [],
      userList: [],
      fileListUpload: [],
      tableData2:[]
    };
  },
  computed: {
    ...mapGetters(["breadList", "ifList"])
  },
  components: {
    userAdd
  },
  mounted() {
    this.getUserLists();
  },
  methods: {
    // 导出模板
    outExe() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel"); //引入文件
        const tHeader = [
          "客户编号",
          "客户名字",
          "电话",
          "行业",
          "地址",
          "来源",
          "销售人员",
          "入库时间",
          "状态",
          "跟踪",
          "难易度"
        ]; //将对应的属性名转换成中文
        const data = [];
        export_json_to_excel(tHeader, data, "模板");
      });
    },
    // 导出表格
    getExcel(res) {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/vendor/Export2Excel.js");
        const tHeader = [
          "客户编号",
          "客户名字",
          "电话",
          "行业",
          "地址",
          "来源",
          "销售人员",
          "入库时间",
          "状态",
          "跟踪",
          "难易度"
        ];
        const filterVal = [
          "userNum",
          "userName",
          "phone",
          "job",
          "address",
          "from",
          "salesman",
          "createTime",
          "state",
          "track",
          "degree"
        ];
        const list = res;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "导出列表名称");
      });
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    // 导入表格-el-upload--start
    // excel表上传
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      // 判断上传文件格式
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！"
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！"
        });
      }
    },
    // 移除excel表
    handleRemove(file, fileList) {
      this.fileTemp = null;
    },
    importfxx(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是读取excel内容之后输出的东西
          console.log(outdata);
          this.da = [...outdata];
          let arr = [];
          this.da.map(v => {
            let obj = {};
            obj.ip = v["ip"]; //ip是表的标题
            arr.push(obj);
          });

          //return arr
          // 把读取的excel表格中的内容放进tableData2中(这里要改成自己的表的名字)
          _this.tableData2 = _this.tableData2.concat(arr);
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    // 导入表格-el-upload--end

    // 导入表格--start
    btnClick() {
      document.querySelector(".input-file").click();
    },
    exportData(event) {
      if (!event.currentTarget.files.length) {
        return;
      }
      const that = this;
      // 拿取文件对象
      var f = event.currentTarget.files[0];
      // 用FileReader来读取
      var reader = new FileReader();
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var wb; // 读取完成的数据
        var outdata; // 你需要的数据
        var reader = new FileReader();
        reader.onload = function(e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          // 接下来就是xlsx了，具体可看api
          wb = XLSX.read(binary, {
            type: "binary"
          });
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          // 自定义方法向父组件传递数据
          // console.log('outdata = ' + JSON.stringify(outdata))
          console.log(outdata);
          that.$emit("getResult", outdata);
        };
        reader.readAsArrayBuffer(f);
      };
      reader.readAsBinaryString(f);
    },
    // 导入表格--end

    // 获取用户信息列表
    getUserLists() {
      let data = {
        offset: 1,
        limit: 10
      };
      getUserList(data).then(res => {
        if (res.code == 200) {
          this.userList = res.data.list;
        }
      });
    },
    // 选择复选框
    handleSelectionChange(val) {
      console.log(val);
    },
    // 添加
    add() {
      let list = this.breadList;
      list.push({ path: "", name: "增加" });
      this.$store.commit("SET_BREAD_LIST", list);
      this.$store.commit("SET_IF_LIST", false);
      // this.$router.push('/permission/userAdd')
    },
    // 使用复选框删除
    deleteAll() {},
    // 编辑
    handleClick(e) {
      console.log(e);
    },
    // 删除
    handleDelete(e) {
      console.log(e);
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped>
.user-container {
  width: 100%;
  .user-top {
    width: 100%;
    // min-width: 1600px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    .title {
      font-size: 20px;
      line-height: 50px;
    }
    .operation {
      display: flex;
      justify-content: space-between;
      li {
        padding: 0 10px;
        border-radius: 15px;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        border: 1px solid #acb3c3;
        color: #acb3c3;
        cursor: pointer;
        margin: 10px 5px;
      }
    }
  }
  .user-table {
    width: 100%;
    height: 100%;
    // min-width: 1600px;
    padding: 20px;
    .el-icon-edit {
      font-size: 22px;
      margin: 0 10px;
      cursor: pointer;
      color: #347ab8;
    }
    .el-icon-delete {
      font-size: 22px;
      margin: 0 10px;
      cursor: pointer;
      color: red;
    }
    .el-icon-star-on {
      font-size: 20px;
    }
  }
}
</style>