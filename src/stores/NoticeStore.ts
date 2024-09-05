import type { AdminRuleForm } from "@/components/Admin/AdminManage_Button.vue";
import axios from "axios";
import { type FormInstance, ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useNoticeStore = defineStore("notice", () => {
  const selectedRows = ref([]);
  const notices = ref<NoticeInfo[]>([]);

  axios.get("http://localhost:5172/api/Notices").then((response) => {
    notices.value = response.data;

    for (let item of notices.value) {
      item.date = formatDate(item.date);
    }
  });
  

  const UpdateNotice = () => {
    axios.get("http://localhost:5172/api/Notices").then((response) => {
      notices.value = response.data;
      for (let item of notices.value) {
        item.date = formatDate(item.date);
      }
    });
  };

  const SearchNotice = async (mes: string) => {
    UpdateNotice();
    axios
      .get(`http://localhost:5172/api/Notices/search?searchTerm=${mes}`)
      .then((response) => {
        notices.value = response.data;
        for (let item of notices.value) {
          item.date = formatDate(item.date);
        }
      });
  };

  const DeleteNoticeSelectRows = () => {
    for (const item of selectedRows.value) {
      console.log(item);
      axios
        .delete(
          `http://localhost:5172/api/Notices/${(item as AdminRuleForm).id}`
        )
        .then(() => {
          UpdateNotice();
        });
    }
  };

  // 重写时间选择器的验证规则
  const ValidateDate = (info: NoticeInfo) => {
    return (rule: any, value: any, callback: any) => {
      if (!info.date || info.date.trim() === '') {
        callback(new Error("请选择时间"));
      } else {
        callback(); // 验证通过
      }
    };
  };
  

  // 重置表单
  const ResetForm = (
    newinfo: NoticeInfo,
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
    formRef: {value: FormInstance | undefined},             
    newinfo: NoticeInfo,
    oldinfo = { content: "", date: "" },
    id = 0
  ): Promise<boolean> => {
    if (newinfo.date !== "") {
      if (oldinfo.date !== "") {
        // 更新数据
        await axios.put(`http://localhost:5172/api/Notices/${id}`, newinfo);
        ElMessage.success("更改成功！");
        UpdateNotice();
        // 由于成功后要关闭对话框故成功后将对话框的存在设为false
        return false;
      } else {
        // 创建数据
        await axios.post("http://localhost:5172/api/Notices", newinfo);
        ElMessage.success("创建成功");
        newinfo.content = "";
        newinfo.date = "";
        UpdateNotice();
        return false;
      }
    } else {
      return true;
    }
  };

  return {
    selectedRows,
    notices,

    UpdateNotice,
    SearchNotice,
    DeleteNoticeSelectRows,
    ValidateDate,
    ResetForm,
    OnSubmit
  };
});

export interface NoticeInfo {
  content: string;
  date: string;
}

// 去除获取数据中的时间字符串
export const formatDate = (dateString: string) => {
  return dateString.split("T")[0];
};
