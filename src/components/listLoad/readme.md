## List 列表
瀑布流滚动加载，用于控制长列表的展示

### 使用指南
``` javascript
// 引入组件
import list from '@/components/listLoad/listLoad';
// 注册组件
components: {
    list
},
```

### 代码演示

#### 基础用法

```html
<list
    v-model="loading"
    :finished="finished"
    :immediate-check="false"
    @load="onLoad"
>
  <div v-for="item in list">item</div>
</list>
```

```js
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },

  methods: {
    onLoad() {
        this.loading = true;
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                this.list.push(this.list.length + 1);
            }
            this.loading = false;

            if (this.list.length >= 40) {
                this.finished = true;
            }
        }, 500);
    }
  }
}
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| loading | 是否显示加载中提示，加载过程中不触发`load`事件 | `Boolean` | `false` |
| finished | 是否已加载完成，加载完成后不再触发`load`事件 | `Boolean` | `false` |
| offset | 滚动条与底部距离小于 offset 时触发`load`事件 | `Number` | `300` |
| immediate-check | 是否在初始化时立即执行滚动位置检查 | `Boolean` | `true` |
| finished-text | 加载完成后的底部提示文字 | `String` | `已经到底了` |
| finished-color | 加载完成后的底部提示文字的颜色 | `String` | `#666` |

### Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| load | 滚动条与底部距离小于 offset 时触发 | - |
