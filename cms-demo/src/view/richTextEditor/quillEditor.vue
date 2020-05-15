<template>
  <div class="quill-container">
    <h2>富文本编辑器--quill-editor</h2>
    <div class="quill-con">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>
    <div>
      "<h2>久东风浩荡各回各家感觉好久好</h2><p><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCADcAPgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2aiiivz47wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiisDV/G/hnQmKajrVpDIvWIPvcfVVyf0q4QlN2irsTaW5v0V54/xk8OO22wtNX1E9vstmTn/AL6Ipv8AwtZ8bh4K8T+X13/Yu351v9Tr9Y29bIXPE9ForgbT4weFprgW9819pcp6LfWxT9RnH412tjqNlqdstzYXcF1A3SSGQOp/EVnUoVafxxaGpJ7FmiiisRhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFYHirxhpfhKyWa+dpJ5Ttt7WEbpZm9FHp70/wAWeJrTwn4fn1S6+Yr8sMQPMsh+6o/z0BrlPCHhm5kuf+Eq8SH7Rr12oZVcfLaIeiIOxwefy9SdG6dGk69b4dkurfb07sWsnyxKo0rxd42Pn6/fy6HpT/c0yybErL/00f8Ap+gre0jwN4Z0RALPSLYyD/lrMvmOT67myR+FdDRXh4nNcTW91Plj2Wi/4PzN40ox82CgKoVQAB0A6CiiivObbNCve2FnqMJhvrSC5iP8E0Ycfka4a++Hc+j3rat4Hv30q96vaMxa3m9iDnH6j6da9BorswuYYjCv93LTs9U/kROnGW5zXg7x+NavJNE1u1/szxDBkPbNwsuP4oyevrjnjkZFdvXB+NfB0XiexSe2f7NrFp89ndIdrKw5Ck+mfyPP1t/DzxdJ4m0iWDUE8nWdPfyL2IjB3DgNj3wfxB9q+hhOliqPt6Ktb4l2815P8DnacHyyOxooorMYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUV5vrvxFvb7U7jQfBll9rvomMdxfTDEFseh/wB4jB9uON1a0qMqr93ZbvovUTdijrKt4t+M1tYMd2neH4RPImeGmbBH80/75NeiV5l8Gop7nT9a1u9nNxd3t7seZur7BnP5ua9Nry89qf7SqC2gkvnu/wATWgvd5u5U1DVdP0mETajfW9pGxwGnkCAn0Gamtrm3vLdLi1njngcZSSJgysPYivCfjXpmsz+KYLr7PPNp/wBnVIWjQsqNk7gcdCTz7jHpXb/BzRtW0fwpONTjkgWefzIIZBhlXaATjtn09vetMRlFGll0cWql5O2nr09V1FGs3U5LHolFHQZPSqMupKrFUXdjvXl4XBV8U2qUb2OmMXLYvUVSh1FXYK67c96u0YrBVsK0qqtcJRcdwrznxlFJ4N8WWHjixRhauwttVjQffjPAfHr0/EL716NVDXNLi1rQ73TZlBS5haPnsSOD+BwfwrXLcX9WxCk/hej9Hv8A5mVWHNE3opY54UmicPG6hlYHgg8g0+uG+EmqS6h4BtYLhibnT5Hs5Qeo2H5R+ClR+FdzXv1qfsqkodmc8XdXCiiishhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFeS+OPDmpeE7698VeGIjJbXKN/adiOmSD+9Ue2cn057E49aqpqlsbzSL21HWaB4/wA1I/rXRh6zpz11T3XdCkuqOA+EUQj+G+nsBgyPKx9z5jD+gruK4X4QXHn/AA6so+9vLLEfrvLf+zV3VfPZtf69Wv8AzP8AM6KP8NBRRRXn3NBHXejL6jFYklvLExBQketblHWvVy3NZ4G6SumXCo4GJFbSyuAFIHqa2lG1QPQUtFLMs0njmk1ZIJzcwoooryiDzDStavvAfinxNZnw7q2o217eC7t3soCyjcMtz07gfga6PSPia2peJ7HQ5/DOq6fNeBijXShOFUknB6jiusrhvDgPiP4tatrAGbLRoP7PhbsZSSXI+nzD8RX1uDxscYpOpT+GOru99EtPM45wcLWZ6XRRRUDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAPKPhx/wASfxF4r8MOcG2vTcwqe8b9/wAtn516LXn3j+GXwl4z03xxboWs5ALLUlUdEPR/5fiqjvXfQyx3EEc0Lq8Uih0dTkMDyCK4c8pN1I4lbTX4rRr9S6EtOXsPooorwzoCoZLu2iuobWS4iS4mDGKJnAZwOTgdTipq4j4iaLqdwmneINCDPqmkSGRYQM+bGcblx36dO4J74rrwVCFesqVSXLe+vn0v5XInJxjdHb0Vx3h34meHddhVJruPTr4DEltdts2t3AY4B/n7Vt3nijQdPhMt1rNhEmM8zqSfoAcn8KdXAYqnU9nKm7+gKpFq9zWorzS48Raz8Qbv+zvCwuLDRlkH2nWDlGYA/dj7/wBfXA6+hX19a6Vp0t5e3CxW0CbpJZD0H9T/ADq8RgKlDlhJ+/L7K3Xa/m+24o1FK7Wxj+NfEi+F/Dk12g33kp8m0iAyXlbpx7dfwq54A8OP4Y8I2tlPzeSZnum6kyvycnvjgfhXIeFbK68f+LF8X6lA8WjWJK6TbyfxtnmUj6jP1x/dr1avehQWDoKh9p6y9ei+X5nO5c8ubp0CiiioGFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAVdS0611fTbjT72IS21whSRD3B/r715VYX998Lb4aJrxluPDkr4sNSC7vJzzsfHT/OOOnr9V72xtdRtJLS9t47i3lG14pFDKw+lawnBwdKqrwfTt5rzE073W5RguIbu3Se3mSaGQbkkjYMrD1BHWpK8+1PwRe+Drlb/wdrcVlHPKE/svUJcwTOeioSeGPYdfeopfijPoU8dp4t8N3+m3D52yQ4ljkx1KnI4+hNebWyOq/ewr5122f3Pf5XNI11tLQ9Gorjbb4q+DLkD/AInCxMf4ZYZFx+O3FWJviT4OgUl9etj/ALgZ/wCQNcDyzGp2dKX3M09rDuXtZ8G+HdfcyanpNvNKesoBRz9WXBNZll8L/B1jKJI9FjkYHI8+R5B+TEj9Kzbv4yeFoFc2ov73aMkwW5AH1LEYqKPxF4+8VxofD3h+LS7KUZW+1F8kqejKv/1mFerQwmbqHK5uEfOVl92/4GUp0b3tdnZatrOk+F9K+0300VpaxjaiAYJ/2VUdT7CuKsdJ1b4o6jBqOs28un+FYW329kzYe7PZm9v8jqTW1onwttY79NW8TX82vamOQbj/AFMZ/wBlO+Pfj2FeggYGBXVQpUcH71N81R/a7en+bIk3PfRDIYY7eFIYY1jijUKiIMBQOgA7Cn0UVG4wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKQjIIzj3paKAPF/iGviPQfD1xb63qWna3pcz/uTNi3vI3ByrJt4JH4/QCq/w6utVvPFtpfeL9N1me+e3Fvp1xLaHyYkwSWLcfMR3x3Oetes6h4X0XVdYtdWvtPiuL21XbDJJkhRnP3c4OD0JHFa9em8fH2Ps1HV7vb7rfjtcy9m+a5nXOgaNenN1pNhOfWW2Rj+oqtD4P8ADMDBovD+low6EWkef5VtUVwKrNK3M/vNLI80+Ivie58HxGBdO0a50W5g8t7VpfKnbOQwCjquMcgcc1zPwsvfHGqaHa2Olm3tNEtro5vLgeZIY8gmJB36nnA69Riu9n+GeiPJql6qyT6repII7u9bzjAzA4Kg8DBPHfjrWz4R8PR+FvC9jo8biQwId8gGN7kksfzJ/CvReKoQw3JBXldbr8bGfI3K7NuiiivKNQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9k="></p>"
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "",
  data() {
    return {
      content: "",
      editorOption:{}
    };
  },
  components: {quillEditor},
  computed:{
    editor() {
            return this.$refs.myQuillEditor.quill;
        }
  },
  mounted() {},
  methods: {
    onEditorReady(editor) { // 准备编辑器
 
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(res){
          console.log(res)
        }, // 内容改变事件
  },
  watch: {
    // content(res){
    //   console.log(res)
    // }
  }
};
</script>
<style lang='scss' scoped>
.quill-container{
  width: 100%;
  height:100%;
  .quill-con{
    width:1000px;
    height:800px;
  }
}
</style>