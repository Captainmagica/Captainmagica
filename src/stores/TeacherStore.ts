import type { TeacherRuleForm } from "@/components/Teacher/TeacherManage_Button.vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTeacherStore = defineStore("teacher", () => {
  const teacherInfo = ref();
  const selectedRows = ref([]);
  axios
    .get("http://localhost:5172/api/Teachers/GetTeacherInfoWithTeacherAvatars")
    .then((response) => {
      teacherInfo.value = response.data;
    });

  const UpdateTeacherInfo = () => {
    axios
      .get(
        "http://localhost:5172/api/Teachers/GetTeacherInfoWithTeacherAvatars"
      )
      .then((response) => {
        teacherInfo.value = response.data;
      });
  };

  const SearchTeacher = async (mes: string) => {
    if (!mes.trim()) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5172/api/Teachers/search?searchTerm=${mes}`
      );
      teacherInfo.value = response.data;
    } catch (error) {
      ElMessage.error("查询失败！");
    }
  };

  const DeleteTeacherSelectedRows = () => {
    for (const item of selectedRows.value) {
      axios
        .delete(
          `http://localhost:5172/api/Teachers/${(item as TeacherRuleForm).id}`
        )
        .then(() => {
          UpdateTeacherInfo();
        });
    }
  };

  return {
    teacherInfo,
    selectedRows,
    UpdateTeacherInfo,
    SearchTeacher,
    DeleteTeacherSelectedRows,
  };
});
