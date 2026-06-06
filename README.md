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

### Surge 模块（推荐）

直接安装以下模块：

```text
https://raw.githubusercontent.com/Jimmyzsan/baidu-clean-search/main/baidu-clean-search.sgmodule
```

模块已经包含 `[Map Local]` 和百度 HTTPS 解密主机名，不要只复制中间的一条正则。

### 手动配置

```ini
[Map Local]
^https?:\/\/(?:www|m)\.baidu\.com\/?(?:\?[^#]*)?$ data-type=file data="https://raw.githubusercontent.com/Jimmyzsan/baidu-clean-search/main/index.html" header="Content-Type: text/html; charset=utf-8"

[MITM]
hostname = %APPEND% www.baidu.com, m.baidu.com
```

也可以直接引用 [`rewrite.conf`](https://raw.githubusercontent.com/Jimmyzsan/baidu-clean-search/main/rewrite.conf)。

## 使用

1. 在 Surge 的模块页面添加上面的 `.sgmodule` 链接并启用。
2. 确认 Surge 的 MITM 证书已安装并信任。
3. 彻底关闭百度标签页，清理网页缓存后重新打开 `https://www.baidu.com/`。

生效后的页面只会看到“百度”标题、一个搜索框和“百度一下”按钮。如果仍有新闻、热榜或广告，
说明看到的仍是百度原始页面，应检查模块是否启用、MITM 是否开启，以及请求是否经过 Surge。

## 安全

页面只有静态 HTML 和 CSS，表单直接提交到：

```text
https://www.baidu.com/s?wd=关键词
```

为了避免远程文件后续变化影响使用，可以将 `data` 地址固定到某个 Git commit。

## License

[MIT](LICENSE)
