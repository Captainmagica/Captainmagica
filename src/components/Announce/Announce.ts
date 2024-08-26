import tableStore from "@/stores/table";
import axios from "axios";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { reactive, type Ref } from "vue";

export interface AnnounceInfo{
    content: string,
    date: string,
}

// 重写时间选择器的验证规则
export const ValidateDate = (info: AnnounceInfo) => {
    return (rule: any, value: any, callback: any) => {
        if (info.date == null) {
            callback(new Error("请选择时间"));
        } else {
            callback(); // 验证通过
        }
    }
}

// 重置表单
export const ResetForm = (newinfo: AnnounceInfo,  oldinfo = {content: '', date: ''}) => {
    if(newinfo.date != ''){
        Object.assign(newinfo, oldinfo)
    }
    else{
        newinfo.content = ''
        newinfo.date = ''
    }
}

// 提交表单，创建或更新通知
export const OnSubmit = async (formRef: FormInstance, newinfo: AnnounceInfo, oldinfo = { content: '', date: '' }, id = 0): Promise<boolean> => {
    if (newinfo.date != '') {
        console.log(newinfo);
        if (oldinfo.date !== '') {
            // 更新数据
            await axios.put(`http://localhost:5172/api/Announces/${id}`, newinfo);
            ElMessage.success("更改成功！");
            tableStore().UpdateAnnounce()
            // 由于成功后要关闭对话框故成功后将对话框的存在设为false
            return false;
        } else {
            // 创建数据
            await axios.post('http://localhost:5172/api/Announces', newinfo);
            ElMessage.success("创建成功");
            newinfo.content = ''
            newinfo.date = ''
            tableStore().UpdateAnnounce()
            return false;
        }
    } else {
        console.log('表单验证失败，请检查后再提交');
        return true;
    }
};


