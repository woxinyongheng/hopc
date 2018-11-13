<template>
    <div class="upload">
        <div tabindex="0" class="el-upload el-upload--picture-card" @click="upClick">
            <i class="el-icon-plus"></i>
            <input @change="upImage"  type="file" name="file" class="el-upload__input">
        </div>
    </div>
</template>

<script>
    export default {
        name: "UpLoad",
        data:function () {
            return{
                photo:'',
                imgurl:'',
                type:''
            }
        },
        methods:{
            upClick(){
                document.querySelector('[type="file"]').click();
            },
            upImage(e){
                var vm =this
                var _file = e.target.files[0];
                if(_file.type.indexOf('image')>-1){
                    vm.type='image'
                }else if(_file.type.indexOf('audio')>-1){
                    vm.type='audio'
                }else{
                    vm.$message({
                        message: '请选择正确的格式',
                        type: 'warning'
                    });
                    return
                }
                var form = new FormData(); // FormData 对象
                form.append("file", _file); // 文件对象
                vm.photo = form
                var _reader = new FileReader();
                _reader.readAsDataURL(_file);
                _reader.onload = function(result){
                    var  data = ''
                    if (typeof result.target.result === 'object') {
                        data = window.URL.createObjectURL(new Blob([result.target.result]))
                    } else {
                        data = result.target.result
                    }
                    vm.imgurl = data
                    vm.$emit('uploadHandle',vm.photo,vm.imgurl,vm.type)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.upload{
    display: inline-block;
}
</style>