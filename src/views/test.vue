<template>
  <div>
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
      msg: '',
      ws: '',
      messages: [],
      username: localStorage.getItem('username'),
    }
  },
  methods: {
    send() {
      if (!this.ws) {
        return false;
      }
      console.info('sdf'+this.msg)
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
        that.ws = new WebSocket("ws://" + "localhost:9090" + "/ws?user_name=" +
            that.username +
            "&room_id=aaaa");
        that.appendLog("admin", "Socket connection successfully")
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
        that.appendLog("admin", "Connection Error")
      }
    }
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
</style>