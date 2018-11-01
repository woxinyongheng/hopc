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
                imgurl:''
            }
        },
        methods:{
            upClick(){
                document.querySelector('[type="file"]').click();
            },
            upImage(e){
                var vm =this
                var _file = e.target.files[0];
                var form = new FormData(); // FormData 对象
                form.append("file", _file); // 文件对象
                // vm.add.photo = form
                vm.photo = e.target.files[0]
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

                }
            }
        }
    }
</script>

<style scoped>

</style>