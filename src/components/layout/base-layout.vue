<template>
  <div class="w-screen h-screen"
       @mouseup="end"
       @touchend="end"
       @mousemove="move"
       @touchmove="move">
    <div class="border-b border-solid h-10 w-full"
         id="cursor-top"
         ref="top-box">
      <slot name="header"></slot>
    </div>
    <div class="flex flex-row justify-between">
      <!--左侧-->
      <div class="flex flex-row  min-w-4"
           ref="left-box"
           :style="{width:layoutSize.leftBox.width, height: layoutSize.leftBox.height}">
        <div class="flex-grow">
          <slot name="left"></slot>
        </div>
        <div class="w-2 cursor-e-resize border-l border-solid"
             id="cursor-left"
             @mousedown="down"
             @touchstart="down">
        </div>
      </div>
      <div class="
               flex
               flex-col
               ">
        <div class="flex flex-row flex-grow">
          <div class="flex flex-col flex-grow"
               ref="content-box"
               :style="{
                width:layoutSize.contentBox.width,
                height: layoutSize.contentBox.height
               }">
            <div ref="content-menu-box"
                 :style="{
                width:layoutSize.contentMenuBox.width,
                height: layoutSize.contentMenuBox.height
               }">
              <slot name="content-menu"></slot>
            </div>
            <div ref="content"
                 :style="{
                width:layoutSize.content.width,
                height: layoutSize.content.height
               }">
              <el-scrollbar :width="layoutSize.content.width"
                            :height="layoutSize.content.height">
                <slot name="content"></slot>
              </el-scrollbar>
            </div>
          </div>
          <!--右侧-->
          <div class="flex flex-row  "
               ref="right-box"
               :style="{
                width:layoutSize.rightBox.width,
                height: layoutSize.rightBox.height
               }">
            <div class="w-2 cursor-w-resize border-r border-solid"
                 id="cursor-right"
                 @mousedown="down"
                 @touchstart="down"></div>
            <div class="min-w-4 flex-grow">
              <slot name="right"></slot>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-between h-72"
             ref="footer-box"
             :style="{
                width:layoutSize.footerBox.width,
                height: layoutSize.footerBox.height
               }">
          <div class="h-2 cursor-n-resize border-b border-solid"
               id="cursor-footer"
               @mousedown="down"
               @touchstart="down"></div>
          <div class="flex-grow">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup () { },
  data () {
    return {

      contentScrollbar: {},
      moveArg: {
        activeBox: "",
        moveDiv: {},
        canMove: false,
        position: {
          x: 0,
          y: 0,
        },
        nx: "",
        ny: "",
        dx: "",
        dy: "",
        xPum: "",
        yPum: "",
      },
      layoutSize: {
        leftBox: {
          height: "calc(100vh - 2.5rem)",
          width: "18rem",
        },
        contentMenuBox: {
          height: "2rem",
          width: "calc(100vw - 36rem)",
        },
        contentBox: {
          height: "calc(100vh - 2.5rem - 18rem)",
          width: "calc(100vw - 36rem)",
        },
        content: {
          height: "calc(100vh - 4.5rem - 18rem)",
          width: "calc(100vw - 36rem)",
        },
        rightBox: {
          height: "calc(100vh - 20.5rem)",
          width: "18rem",
        },
        footerBox: {
          height: "18rem",
          width: "calc(100vw - 18rem)",
        }
      }
    };
  },
  mounted () {
    this.commitLayoutSize()
  },
  methods: {
    down (event) {
      this.moveArg.moveDiv = event.target;
      this.moveArg.activeBox = this.moveArg.moveDiv.id;
      this.moveArg.canMove = true;
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.moveArg.position.x = touch.clientX;
      this.moveArg.position.y = touch.clientY;
      this.moveArg.dx = this.moveArg.moveDiv.offsetLeft;
      this.moveArg.dy = this.moveArg.moveDiv.offsetTop;
      console.log("选中");
    },
    move (event) {
      if (this.moveArg.canMove) {
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.moveArg.nx = touch.clientX - this.moveArg.position.x;
        this.moveArg.ny = touch.clientY - this.moveArg.position.y;
        this.moveArg.xPum = this.moveArg.dx + this.moveArg.nx;
        this.moveArg.yPum = this.moveArg.dy + this.moveArg.ny;
        switch (this.moveArg.activeBox) {
          case "cursor-left":
            this.moveLeft()
            break;
          case "cursor-right":
            this.moveRight()
            break;
          case "cursor-footer":
            this.moveFooter()
            break;
        }
      }
    },
    end () {
      this.moveArg.moveDiv = {};
      this.moveArg.activeBox = "";
      this.moveArg.canMove = false;
    },
    moveLeft () {
      let rightWidth = this.$refs['right-box'].offsetWidth
      if (this.moveArg.xPum < 63) return;
      if (window.innerWidth - 350 - rightWidth < this.moveArg.xPum) return;
      if (this.moveArg.xPum < 160) this.moveArg.xPum = 70
      this.layoutSize.leftBox.width = "calc(" + this.moveArg.xPum + "px)"
      this.layoutSize.contentMenuBox.width = "calc(100vw - " + this.moveArg.xPum + "px - " + rightWidth + "px)"
      this.layoutSize.contentBox.width = "calc(100vw - " + this.moveArg.xPum + "px - " + rightWidth + "px)"
      this.layoutSize.content.width = "calc(100vw - " + this.moveArg.xPum + "px - " + rightWidth + "px)"
      this.layoutSize.footerBox.width = "calc(100vw - " + this.moveArg.xPum + "px)"
      this.commitLayoutSize()
    },
    moveRight () {
      let leftWidth = this.$refs['left-box'].offsetWidth
      if (this.moveArg.xPum > window.innerWidth - 220) return;
      if (350 + leftWidth > this.moveArg.xPum) return;
      this.layoutSize.rightBox.width = "calc(100vw - " + this.moveArg.xPum + "px)"
      this.layoutSize.contentMenuBox.width = "calc( " + this.moveArg.xPum + "px - " + leftWidth + "px)"
      this.layoutSize.contentBox.width = "calc( " + this.moveArg.xPum + "px - " + leftWidth + "px)"
      this.layoutSize.content.width = "calc( " + this.moveArg.xPum + "px - " + leftWidth + "px)"
      this.commitLayoutSize()
    },
    moveFooter () {
      if (this.moveArg.yPum > window.innerHeight - 50) return;
      if (this.moveArg.yPum < 350) return;
      this.layoutSize.footerBox.height = "calc(100vh - " + this.moveArg.yPum + "px)"
      this.layoutSize.rightBox.height = "calc(" + this.moveArg.yPum + "px - 2.5rem)"
      this.layoutSize.contentBox.height = "calc(" + this.moveArg.yPum + "px - 2.5rem)"
      this.layoutSize.content.height = "calc(" + this.moveArg.yPum + "px - 4.5rem)"
      this.commitLayoutSize()
    },
    /**
     * 布局组件其实不消费 layoutSize
     * 布局组件产生 layoutSize
     */
    commitLayoutSize () {
      this.$store.commit('setLayoutSize', {
        leftBox: {
          height: this.$refs['left-box'].offsetHeight,
          width: this.$refs['left-box'].offsetWidth,
        },
        contentMenuBox: {
          height: this.$refs['content-menu-box'].offsetHeight,
          width: this.$refs['content-menu-box'].offsetWidth,
        },
        contentBox: {
          height: this.$refs['content-box'].offsetHeight,
          width: this.$refs['content-box'].offsetWidth,
        },
        content: {
          height: this.$refs['content'].offsetHeight,
          width: this.$refs['content'].offsetWidth,
        },
        rightBox: {
          height: this.$refs['right-box'].offsetHeight,
          width: this.$refs['right-box'].offsetWidth,
        },
        footerBox: {
          height: this.$refs['footer-box'].offsetHeight,
          width: this.$refs['footer-box'].offsetWidth,
        }
      })
    }
  },
  computed: {
    bodyHeight () {
      return "";
    },
  },
};
</script>
<style scoped>
.min-w-4 {
  min-width: 1.5rem;
}
.min-h-4 {
  min-height: 2rem;
}
</style>