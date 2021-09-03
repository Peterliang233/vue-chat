<template>
  <div
      class="div-editable"
      contenteditable="plaintext-only"
      v-html="innerText"
      @input="changeText"
      @focus="focusFunc"
      @blur="blurFunc"
      ref="editDiv"
  ></div>
</template>

<script>
export default {
  name: 'DivEditable',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      innerText: this.value,
      isChange: true
    };
  },
  watch: {
    value(e) {
      if (this.isChange) {
        this.innerText = this.value;
      }
      if (!this.value) {
        this.$el.innerHTML = '';
      }
    }
  },
  mounted() {
    this.$refs.editDiv.focus();
  },

  methods: {
    changeText(e) {
      this.$emit('input', this.$el.innerHTML.replace(/<div><br><\/div>/g, '<br/>'));
    },
    blurFunc(val) {
      this.isChange = true;
      this.$emit('blurFunc');
    },
    focusFunc() {
      this.$refs.editDiv.focus();
      this.isChange = false;
      this.saveRange();
    },
    saveRange() {
      var selection = window.getSelection ? window.getSelection() : document.selection;
      if (!selection.rangeCount) return;
      var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
      window._range = range;
    },
    //获取表情
    handleEmotion(i) {
      this.$refs.editDiv.focus();
      var img = `<img src="https://.../${i}.gif" align="top">`;//这里接的是表情的img（不方便给地址，你们自己解决下啊）
      var selection,
          range = window._range;
      if (!window.getSelection) {
        range.pasteHTML(img);
        range.collapse(false);
        range.select();
      } else {
        selection = window.getSelection ? window.getSelection() : document.selection;
        range.collapse(false);
        var hasR = range.createContextualFragment(img);
        var hasR_lastChild = hasR.lastChild;
        while (
            hasR_lastChild &&
            hasR_lastChild.nodeName.toLowerCase() == 'br' &&
            hasR_lastChild.previousSibling &&
            hasR_lastChild.previousSibling.nodeName.toLowerCase() == 'br'
            ) {
          var e = hasR_lastChild;
          hasR_lastChild = hasR_lastChild.previousSibling;
          hasR.removeChild(e);
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
          range.setEndAfter(hasR_lastChild);
          range.setStartAfter(hasR_lastChild);
        }
        selection.removeAllRanges();
        selection.addRange(range);
      }
      this.changeText();
    }
  }
};
</script>

<style>
.div-editable {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
}

.div-editable[contenteditable='true'] {
  user-modify: read-write-plaintext-only;
}

.div-editable[contenteditable='true']:empty:before {
  content: attr(placeholder);
  display: block;
  color: #ccc;
}
</style>
