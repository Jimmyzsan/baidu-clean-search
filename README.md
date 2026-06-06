# 百度纯净搜索

打开百度首页时，用一个无广告、无热榜、无推荐内容的静态搜索页替换原首页。
搜索结果仍由百度官方提供，本项目不会修改搜索结果页。

## 特点

- 无 JavaScript
- 无外部图片、字体或统计代码
- 支持浅色和深色模式
- 兼容桌面与移动端布局
- 覆盖 `www.baidu.com` 和 `m.baidu.com` 首页及其查询参数
- 不匹配 `/s`，不会循环拦截搜索结果

## 重写规则

```ini
^https?:\/\/(?:www|m)\.baidu\.com\/?(?:\?[^#]*)?$ data-type=file data="https://raw.githubusercontent.com/Jimmyzsan/baidu-clean-search/main/index.html" header="Content-Type: text/html; charset=utf-8"
```

也可以直接引用 [`rewrite.conf`](https://raw.githubusercontent.com/Jimmyzsan/baidu-clean-search/main/rewrite.conf)。

## 使用

1. 将上面的规则加入支持 `data-type=file` 的重写工具。
2. 开启 HTTPS 解密，并将 `www.baidu.com`、`m.baidu.com` 加入主机名列表。
3. 重新打开 `https://www.baidu.com/` 或 `https://m.baidu.com/`。

不同客户端对规则分区名称和 HTTPS 解密设置的叫法可能不同。首次启用后若仍显示百度原首页，
请清理浏览器缓存并确认重写功能已开启。

## 安全

页面只有静态 HTML 和 CSS，表单直接提交到：

```text
https://www.baidu.com/s?wd=关键词
```

为了避免远程文件后续变化影响使用，可以将 `data` 地址固定到某个 Git commit。

## License

[MIT](LICENSE)
