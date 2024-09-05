import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { AdminRuleForm } from "@/components/Admin/AdminManage_Button.vue";
import { ElMessage } from "element-plus";


export const useAdminStore = defineStore("Admin", () => {
    const adminInfo = ref();
    const selectedRows = ref([]);
  
    axios
      .get("http://localhost:5172/api/AdminInfo/GetAdminInfoWithAdminAvatars")
      .then((response) => {
        adminInfo.value = response.data;
      });
  
    const UpdateAdminInfo = () => {
      axios
        .get("http://localhost:5172/api/AdminInfo/GetAdminInfoWithAdminAvatars")
        .then((response) => {
          adminInfo.value = response.data;
        });
    };
  
    const SearchAdmin = async (mes: string) => {
      if (!mes.trim()) {
        return;
      }
  
      try {
        const response = await axios.get(
          `http://localhost:5172/api/AdminInfo/search?searchTerm=${mes}`
        );
        adminInfo.value = response.data;
      } catch (error) {
        ElMessage.error("查询失败！");
      }
    };
  
    const DeleteAdminSelectedRows = () => {
      for (const item of selectedRows.value) {
        console.log(item);
        axios
          .delete(
            `http://localhost:5172/api/AdminInfo/${(item as AdminRuleForm).id}`
          )
          .then(() => {
            UpdateAdminInfo();
          });
      }
    };
  
    return {
      adminInfo,
      selectedRows,
  
      UpdateAdminInfo,
      DeleteAdminSelectedRows,
      SearchAdmin,
    };
});

export interface Admin {
  id: string;
  username: string;
  name: string;
  phone_number: string;
  email: string;
  role: string;
  avatarUrl: string;
}
