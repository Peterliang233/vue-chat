<template>
  <div v-if="enter === 'Yes'">
    <el-button class="dialog" type="text" @click="open">点击进入聊天室</el-button>
  </div>
  <div v-else style="font-weight: bolder">
    <div id="div1" ref="box">
      <div v-for="message in messages">
        <div style="color: #42b983;" v-if="message.name === username">
          {{message.content}}
        </div>
        <div style="color: #409EFF;" v-else>
          {{message.content}}
        </div>
      </div>
    </div>
    <div id="div2">
      <el-upload
          class="upload-demo"
          action="http://localhost:9090/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="onSuccess"
          :on-error="OnError"
          multiple
          :limit="3"
          :file-list="fileList">
        <el-button size="small" type="primary">上传文件</el-button>
      </el-upload>

      <el-input
          style="float: left;height: 50%;font-size:x-large"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="msg">
      </el-input>
      <el-button type="primary" style="float: right" @click="send">发送/send</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      fileList: [],
      enter: localStorage.getItem('enter'),
      msg: '',
      ws: '',
      roomID: localStorage.getItem('roomID'),
      messages: [],
      username: localStorage.getItem('username'),
    }
  },
  methods: {


    // 文件上传部分
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onSuccess(response, file, fileList) {
      this.$message.success("文件上传成功")
    },
    OnError(err, file, fileList) {
      this.$message.error(err)
    },




    open() {
      this.$prompt('请输入房间号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        if(!value) {
          this.$message({
            type: 'error',
            message: '房间号不能为空'
          });
        }else if(isNaN(value)){
          this.$message({
            type: 'error',
            message: '房间号只能是一串数字'
          });
        } else{
          this.$message({
            type: 'success',
            message: '您成功进入该房间'
          });
          localStorage.setItem('enter','No');
          localStorage.setItem('roomID', value);
          window.location.reload();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    send() {
      if (!this.ws) {
        return false;
      }
      console.info('debug:'+this.msg)
      this.ws.send(this.msg);
      this.msg = "";
      return false;
    },
    appendLog (username ,content) {
      this.messages.push({name:username, content: content});
      var div = this.$refs.box;
      setTimeout(()=> {
        div.scrollTop = div.scrollHeight;
      })
      return true;
    },
  },
  mounted() {
    let that = this;
    window.onload = function () {

      if (window["WebSocket"]) {
        console.info("roomkey:" + that.roomKey)
        that.ws = new WebSocket("ws://" + "localhost:9090" + "/ws?user_name=" +
            that.username +
            "&room_id=" +
            that.roomID);
        that.appendLog("admin", "socket通信已经开启")
        that.ws.onclose = function (evt) {
          console.info("Socket Connection Close");
          that.appendLog("admin", "Socket Connection Close")
        };
        that.ws.onmessage = function (evt) {
          var mess = evt.data.split('\n');
          console.info(mess)
          for (var i = 0; i < mess.length; i++) {
            console.info("Receive message:" + mess[i]);
            that.appendLog(that.username,mess[i]);
          }
        };
      } else {
        console.info("Don't support");
        that.appendLog("admin", "您的浏览器似乎不支持socket通信")
      }
    }
  },
  watch: {

  }
}
</script>



<style scoped>
#div1{
  overflow: auto;
  height: 800px;
}
#div2 {
  position:fixed;
  bottom:0;
  width:100%;
}

.dialog{
  position: absolute;
  top: 50%;
  left: 50%;
  font-weight: bolder;
  font-size: x-large;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>