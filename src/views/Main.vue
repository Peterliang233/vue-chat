<template>
  <div class="view">
    <el-container>
      <el-header>简易聊天室</el-header>
    </el-container>
    <div v-for="(item,index) in msgList" :key="index" class="chat-box">{{item}}</div>
    <div class="footer">
      <el-input
          style="float: left"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
      </el-input>
      <el-button type="primary" style="float: right" @click="send">发送/send</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      msg: '',
      ws: '',
      msgList: [],
      textarea: ''
    }
  },
  methods: {
    send() {
      this.ws.send(this.msg)
      //this.ws.send(JSON.stringify({msg: this.msg}))
      this.msg = ''
    }
  },
  mounted() {
    this.ws = new WebSocket('ws://127.0.0.1:3000/ping')
    // 连接打开时触发
    this.ws.onopen = () => {
      console.log("Connection open ...")
    }
    // 接收到消息时触发
    this.ws.onmessage = (evt) => {
      console.log(evt)
      this.msgList.push(evt.data)
    }
    this.ws.onclose = () => {
      console.log('Connection close !!!')
    }
  },
  // 关闭连接
  beforeDestroy() {
    this.ws.close()
  }
}
</script>

<style scoped>
.view{
  height: 100%;
  width: 100%;
  position: fixed;
  margin: 0 auto;
  background-color:aliceblue;
  text-align: center;
  padding-top: 80px;
}
.chat-title{
  text-align:left;
  margin-left:100px;
  margin-top:50px;
}
.chat-box{
  background-color: white;
  width: 400px;
  margin: 0 auto;
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;
}
</style>