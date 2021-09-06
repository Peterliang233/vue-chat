<template>
  <div>
    <div id="log"></div>
    <form id="form">
      <input type="submit" style="color: #409EFF" value="Send" />
      <input type="text" class="msg" id="msg" size="64"/>
    </form>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      username: localStorage.getItem('username'),
    }
  },
  mounted() {
    let that = this;
    window.onload = function () {
      var conn;
      var msg = document.getElementById("msg");
      var log = document.getElementById("log");

      function appendLog(item) {
        var doScroll = log.scrollTop > log.scrollHeight - log.clientHeight - 1;
        log.appendChild(item);
        if (doScroll) {
          log.scrollTop = log.scrollHeight - log.clientHeight;
        }
      }

      document.getElementById("form").onsubmit = function () {
        if (!conn) {
          return false;
        }
        if (!msg.value) {
          return false;
        }
        console.info(msg.value)
        conn.send(msg.value);
        msg.value = "";
        return false;
      };
      if (window["WebSocket"]) {
        conn = new WebSocket("ws://" + "localhost:9090" + "/ws?user_name="+ that.username +"&room_id=aaaa");
        conn.onclose = function (evt) {
          var item = document.createElement("div");
          item.innerHTML = "<b>Connection closed.</b>";
          appendLog(item);
        };
        conn.onmessage = function (evt) {
          var messages = evt.data.split('\n');
          for (var i = 0; i < messages.length; i++) {
            var item = document.createElement("div");
            item.innerText = messages[i];
            console.info('this is ' + item.innerText)
            appendLog(item);
          }
        };
      } else {
        var item = document.createElement("div");
        item.innerHTML = "<b>Your browser does not support WebSockets.</b>";
        appendLog(item);
      }
    }
  }
}
</script>

<style scoped>
html {
  overflow: hidden;
}
body {
  overflow: hidden;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: gray;
}
#log {
  background: white;
  margin: 0;
  padding: 0.5em 0.5em 0.5em 0.5em;
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  right: 0.5em;
  bottom: 3em;
  overflow: auto;
}
#form {
  padding: 0 0.5em 0 0.5em;
  margin: 0;
  position: absolute;
  bottom: 1em;
  left: 0;
  width: 100%;
  overflow: hidden;
}

.msg {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-weight: bolder;
}
</style>