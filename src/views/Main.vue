<template>
  <div class="view">
    <div id="div1">
      <div v-for="(message,index) in messages">
        <div v-if="index%2===0" class="item left">
          <div>
            <el-link style="font-size: 50px" icon="el-icon-user-solid"/>
            <span>{{ message.name }}</span>
          </div>
          <span class="message">{{ message.content }}</span>
        </div>
        <div v-if="index%2===1" class="item right">
          <div>
            <span>{{ message.name }}</span>
            <el-link style="font-size: 50px" icon="el-icon-user"/>
          </div>
          <span class="message">{{ message.content }}</span>
        </div>
      </div>
    </div>
    <div id="div2">
      <div class="header">简易聊天室</div>
      <el-footer class="footer">
        <el-col :span="12" style="float: right">
          <el-input
              style="float: left;height: 50%;font-size:x-large"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
          </el-input>
          <el-button type="primary" style="float: right" @click="send">发送/send</el-button>
          <el-upload
              style="float: left"
              type="primary"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
            <el-button type="primary" icon="el-icon-upload">上传文件</el-button>
          </el-upload>
        </el-col>
      </el-footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      textarea: '',
      ws: '',
      messages: []
    }
  },
  methods: {
    send() {
       this.messages.push({name: 'xiaoliang', content: this.textarea});
      this.ws.send(this.textarea);
      this.textarea = '';
    }
  },
  mounted() {
    this.ws = new WebSocket('ws://localhost:9090/ws','echo-protocol')
    this.ws.onopen=()=> {
      //this.ws.send('Hello,The connection are successful')
      console.log("Connection Open...")
    }
    this.ws.onmessage=(evt)=> {
      console.log(evt)
      // this.messages.push(evt.data)
      console.info(evt.data)
    }
    this.ws.onclose=()=> {
      console.log("Connection Close")
    }
  },
  beforeDestroy() {
    this.ws.close()
  }
}
</script>

<style scoped>
#div1 {
  width: 50%;
  height: 100%;
  float: left;
}

#div2 {
  width: 50%;
  height: 100%;
  float: left;
}

.item {
  display: flex;
  margin-bottom: 10px;
}

.left {
  flex-direction: row;
}

.right {
  flex-direction: row-reverse;
}

.right .message {
  margin-right: 10px;
}

.left .message {
  margin-left: 10px;
}

.message {
  border-radius: 10px;
  display: flex;
  background: #efefef;
  min-height: 25px;
  padding: 9px 10px;
  align-items: center;
  color: #222121;
}

.view {
  height: 100%;
  width: 100%;
  background-color: aliceblue;
  text-align: center;
}


.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 95px;
  padding: 20px;
}

.header {
  position: fixed;
  text-align: center;
  left: 800px;
  right: 0;
  font-size: x-large;
  font-weight: bolder;
  top: 0;
  padding: 20px;
}
</style>