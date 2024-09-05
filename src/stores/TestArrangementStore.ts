import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { formatDate } from "./NoticeStore";
import { type FormInstance, ElMessage } from "element-plus";
export const useTestArrangementStore = defineStore(
  "testArrangementStore",
  () => {
    const testArrangements = ref<TestInfo[]>([]);
    const selectedRows = ref([]);

    axios.get("http://localhost:5172/api/TestArrangements").then((response) => {
      testArrangements.value = response.data;

      for (let item of testArrangements.value) {
        item.date = formatDate(item.date);
      }
    });

    const UpdateTestArrangement = () => {
      axios.get("http://localhost:5172/api/TestArrangements").then((response) => {
        testArrangements.value = response.data;
        for (let item of testArrangements.value) {
          item.date = formatDate(item.date);
        }
      });
    };

    const SearchTestArrangement = async (mes: string) => {
      UpdateTestArrangement();
      axios
        .get(`http://localhost:5172/api/TestArrangements/search?searchTerm=${mes}`)
        .then((response) => {
          testArrangements.value = response.data;
          for (let item of testArrangements.value) {
            item.date = formatDate(item.date);
          }
        });
    };

    const DeleteTestArrangementSelectRows = () => {
      for (const item of selectedRows.value) {
        axios
          .delete(
            `http://localhost:5172/api/TestArrangements/${(item as TestTableContent).id}`
          )
          .then(() => {
            UpdateTestArrangement();
          });
      }
    };

    // 重写时间选择器的验证规则
    const ValidateDate = (info: TestInfo) => {
      return (rule: any, value: any, callback: any) => {
          if (info.date == null) {
              callback(new Error("请选择时间"));
          } else {
              callback(); // 验证通过
          }
      };
  };
  

    // 重置表单
    const ResetForm = (
      newinfo: TestInfo,
      oldinfo = { content: "", date: "" }
    ) => {
      if (newinfo.date != "") {
        Object.assign(newinfo, oldinfo);
      } else {
        newinfo.content = "";
        newinfo.date = "";
      }
    };

    // 提交表单，创建或更新通知
    const OnSubmit = async (
      newinfo: TestInfo,
      oldinfo = { content: "", date: "" },
      id = 0
    ): Promise<boolean> => {
      if (newinfo.date !== "") {
        if (oldinfo.date !== "") {
          // 更新数据
          await axios.put(`http://localhost:5172/api/TestArrangements/${id}`, newinfo);
          ElMessage.success("更改成功！");
          UpdateTestArrangement();
          // 由于成功后要关闭对话框故成功后将对话框的存在设为false
          return false;
        } else {
          // 创建数据
          await axios.post("http://localhost:5172/api/TestArrangements", newinfo);
          ElMessage.success("创建成功");
          newinfo.content = "";
          newinfo.date = "";
          UpdateTestArrangement();
          return false;
        }
      } else {
        console.log("表单验证失败，请检查后再提交");
        return true;
      }
    };

    return {
      selectedRows,
      testArrangements,

      UpdateTestArrangement,
      SearchTestArrangement,
      DeleteTestArrangementSelectRows,
      ValidateDate,
      ResetForm,
      OnSubmit,
    };
  }
);

export interface TestInfo {
    content: string;
    date: string;
  }

  interface TestTableContent{
    id: number,
    content: string;
    date: string;
  }