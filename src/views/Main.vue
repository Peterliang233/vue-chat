<template>
  <div class="view">
    <div id="div1">
      <el-main>
        <div v-for="(message,index) in messages">
          <div v-if="index%2===0" class="item left">
            <el-link style="font-size: 50px" icon="el-icon-user-solid"/>
            <span class="message">{{ message.content }}</span>
          </div>
          <div v-if="index%2===1" class="item right">
            <el-link style="font-size: 50px" icon="el-icon-user"/>
            <span class="message">{{ message.content }}</span>
          </div>
        </div>
      </el-main>
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
            style="float: right"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
          <el-button type="primary">上传文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
      messages: [
        {
          name: "xiaoliang",
          content: "你好"
        },
        {
          name: "xiaoyan",
          content: "你也好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        },
        {
          name: "xiaoping",
          content: "大家都好"
        }
      ]
    }
  },
  methods: {
    send: {

    }
  }
}
</script>

<style scoped>
#div1{
  width:50%;
  height:300px;
  float:left;
}
#div2{
  width:50%;
  height:300px;
  float:left;
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