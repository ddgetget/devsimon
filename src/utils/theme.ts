// utils/theme.ts
const THEME_LINK_ID = "tdesign-mobile-theme";

/**
 * 切换 TDesign Mobile 主题
 * @param themeName 如 'default', 'dark', 'brand'
 */
export function switchTheme(themeName: string) {
  // 保存到 localStorage
  localStorage.setItem("tdesign-mobile-theme", themeName);

  // 移除旧主题
  const oldLink = document.getElementById(THEME_LINK_ID) as HTMLLinkElement;
  if (oldLink) {
    oldLink.remove();
  }

  // 加载新主题
  const newLink = document.createElement("link");
  newLink.id = THEME_LINK_ID;
  newLink.rel = "stylesheet";
  newLink.href = `/themes/theme-${themeName}.css`;

  // 可选：加载完成后回调
  newLink.onload = () => {
    console.log(`✅ TDesign Mobile 主题已切换为: ${themeName}`);
  };

  document.head.appendChild(newLink);
}

/**
 * 初始化主题（从 localStorage 或默认值）
 */
export function initTheme() {
  const saved = localStorage.getItem("tdesign-mobile-theme") || "default";
  switchTheme(saved);
}
