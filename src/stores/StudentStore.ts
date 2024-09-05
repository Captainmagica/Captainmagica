import type { AdminRuleForm } from "@/components/Admin/AdminManage_Button.vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStudentStore = defineStore('student', () => {
  const studentInfo = ref();
  const selectedRows = ref([]);
  axios
    .get("http://localhost:5172/api/Students/GetStudentsInfo")
    .then((response) => {
      studentInfo.value = response.data;
    });

  const UpdateStudentInfo = () => {
    axios
      .get("http://localhost:5172/api/Students/GetStudentsInfo")
      .then((response) => {
        studentInfo.value = response.data;
      });
  };

  const SearchStudent = async (mes: string) => {
    if (!mes.trim()) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5172/api/Students/search?searchTerm=${mes}`
      );
      studentInfo.value = response.data;
    } catch (error) {
      ElMessage.error("查询失败！");
    }
  };

  const DeleteStudentSelectedRows = () => {
    for (const item of selectedRows.value) {
      axios
        .delete(
          `http://localhost:5172/api/Students/${(item as AdminRuleForm).id}`
        )
        .then(() => {
          UpdateStudentInfo();
        });
    }
  };

  return {
    studentInfo,
    selectedRows,
    UpdateStudentInfo,
    SearchStudent,
    DeleteStudentSelectedRows,
  };
});
