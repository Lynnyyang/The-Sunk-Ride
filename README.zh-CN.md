# The Sunk Ride

[English](README.md) | **中文**

共享单车行为经济学模拟器。界面标题为「共享单车实验模拟器」：二十天天气、距离、行李与时间压力，用来研究 **过度自信**、**套餐选择是否理性**，以及 **沉没成本效应**。

英文名 *The Sunk Ride*：钱已经付过的套餐，仍把人拉上车。

仓库：<https://github.com/Lynnyyang/The-Sunk-Ride>

---

## 这是什么

纯前端 Web 应用。设定被试与分组后，按概率规则生成 **20 天** 骑 / 不骑决策。结果含汇总（预测骑行次数 \(E\) 与实际次数、过度自信 \(E-A\)、代币、现金收益）以及可导出 CSV 的逐日表。

数据是 **模拟教学数据**，不是实地观测。

---

## 实验设计摘要

| 项目 | 数值 |
| --- | --- |
| 套餐（方案 A） | 15 代币 |
| 按次（方案 B） | 每次 1 代币 |
| 初始禀赋 | 30 代币 |
| 代币兑现金 | 0.5 |
| 盈亏平衡 | 15 次 |
| 天数 | 20 个情景（打乱顺序） |

**分组**

1. 标准套餐组 — 每次显示「本次骑行免费」，不展示分摊沉没成本。
2. 成本可见组 — 每次显示分摊沉没成本 \(15/E\)。
3. 对照组 — 仅按次付费（方案 B）。

首页假设：H1 过度自信；H2 购买理性；H3/H4 沉没成本。

骑行概率以 \(E/20\) 为底，再随天气、较长距离、时间压力、重行李以及套餐组的沉没成本因子调整。

---

## 技术栈

Vite 5、TypeScript、React 18、Tailwind CSS、shadcn/ui。开发端口 **8080**。

---

## 本地运行

```bash
git clone https://github.com/Lynnyyang/The-Sunk-Ride.git
cd The-Sunk-Ride
npm install
npm run dev
```

```bash
npm run build
npm run preview
npm run lint
```

无后端、无需 API Key。

---

## 目录

```
src/
  pages/Index.tsx
  components/SimulationForm.tsx
  components/ResultsDisplay.tsx
  lib/experimentData.ts      # 20 个情景与价格
  lib/simulationEngine.ts    # 骑行概率与收益
  types/experiment.ts
```

---

## 许可

[MIT](LICENSE)
