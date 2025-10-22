// utils/theme.ts
const THEME_LINK_ID = "web-theme";

export function switchTheme(themeName: string) {
  localStorage.setItem("theme", themeName);

  const oldLink = document.getElementById(THEME_LINK_ID);
  if (oldLink) oldLink.remove();

  const newLink = document.createElement("link");
  newLink.id = THEME_LINK_ID;
  newLink.rel = "stylesheet";
  newLink.href = `/themes/theme-${themeName}.css`;
  // 可保留 onload 用于调试，不影响初始化
  newLink.onload = () => console.log(`✅ 主题已切换为: ${themeName}`);

  document.head.appendChild(newLink);
}

// ✅ 用于初始化：同步、无 onload、确保阻塞渲染
// export function initThemeSync() {
//   const savedTheme = localStorage.getItem("theme") || "default";

//   // 移除可能残留的（如 HMR 热更新时）
//   const existing = document.getElementById(THEME_LINK_ID);
//   if (existing) existing.remove();

//   const link = document.createElement("link");
//   link.id = THEME_LINK_ID;
//   link.rel = "stylesheet";
//   link.href = `/themes/theme-${savedTheme}.css`;
//   // ⚠️ 不要加 onload！否则变成异步，失去阻塞效果
//   document.head.appendChild(link);
// }
export function initThemeSync() {
  // 如果已有主题 link，说明 HTML 已处理，无需重复
  if (document.getElementById(THEME_LINK_ID)) return;

  const savedTheme = localStorage.getItem("theme") || "dark";
  console.log(savedTheme);
  const link = document.createElement("link");
  link.id = THEME_LINK_ID;
  link.rel = "stylesheet";
  link.href = `/themes/theme-${savedTheme}.css`;
  document.head.appendChild(link);
}
