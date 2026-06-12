// ==UserScript==
// @name         百度纯净搜索
// @namespace    local.codex.baidu-clean-search
// @version      1.0.0
// @description  隐藏百度搜索中的推广、热榜、推荐和右侧栏，保留自然搜索结果。
// @match        https://www.baidu.com/*
// @match        https://baidu.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  "use strict";

  const style = document.createElement("style");
  style.textContent = `
    /* 右侧栏、热榜、推荐和页脚 */
    #content_right,
    #con-ar,
    #rs,
    #foot,
    .cr-content,
    .FYB_RD,
    [class*="hotrank"],
    [class*="recommend"] {
      display: none !important;
    }

    /* 百度明确标记的商业推广结果 */
    [data-tuiguang],
    [data-baodata],
    .ec_wise_ad,
    .ec-ad,
    .ec-tuiguang,
    .result-op[data-click*='"source":"ecom"'] {
      display: none !important;
    }

    /* 让自然结果区域使用更多页面宽度 */
    #container.sam_newgrid,
    #container {
      width: min(1000px, calc(100% - 40px)) !important;
    }

    #content_left {
      width: 100% !important;
      max-width: 900px !important;
    }
  `;

  const mountStyle = () => {
    if (!style.isConnected && document.documentElement) {
      document.documentElement.appendChild(style);
    }
  };

  const isAdResult = (node) => {
    if (!(node instanceof HTMLElement)) return false;

    if (
      node.matches(
        "[data-tuiguang], [data-baodata], .ec_wise_ad, .ec-ad, .ec-tuiguang"
      )
    ) {
      return true;
    }

    const result = node.matches(".result, .result-op, .c-container")
      ? node
      : node.closest(".result, .result-op, .c-container");

    if (!result) return false;

    const adLabel = [...result.querySelectorAll("span, a")].some((element) => {
      const text = element.textContent.trim();
      return text === "广告" || text === "推广";
    });

    return adLabel;
  };

  const clean = (root = document) => {
    root
      .querySelectorAll?.(
        "[data-tuiguang], [data-baodata], .ec_wise_ad, .ec-ad, .ec-tuiguang"
      )
      .forEach((element) => element.remove());

    root
      .querySelectorAll?.(".result, .result-op, .c-container")
      .forEach((element) => {
        if (isAdResult(element)) element.remove();
      });
  };

  mountStyle();

  const observer = new MutationObserver((mutations) => {
    mountStyle();

    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        if (isAdResult(node)) {
          node.remove();
        } else {
          clean(node);
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => clean(), { once: true });
  } else {
    clean();
  }
})();
