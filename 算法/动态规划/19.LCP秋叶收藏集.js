// LCP 19. 秋叶收藏集
// 小扣出去秋游，途中收集了一些红叶和黄叶，他利用这些叶子初步整理了一份秋叶收藏集 leaves， 字符串 leaves 仅包含小写字符 r 和 y， 其中字符 r 表示一片红叶，字符 y 表示一片黄叶。
// 出于美观整齐的考虑，小扣想要将收藏集中树叶的排列调整成「红、黄、红」三部分。每部分树叶数量可以不相等，但均需大于等于 1。每次调整操作，小扣可以将一片红叶替换成黄叶或者将一片黄叶替换成红叶。请问小扣最少需要多少次调整操作才能将秋叶收藏集调整完毕。
//
// 示例 1：
//
// 输入：leaves = "rrryyyrryyyrr"
//
// 输出：2
//
// 解释：调整两次，将中间的两片红叶替换成黄叶，得到 "rrryyyyyyyyrr"
//
// 示例 2：
//
// 输入：leaves = "ryr"
//
// 输出：0
//
// 解释：已符合要求，不需要额外操作
//
// 提示：
//
// 3 <= leaves.length <= 10^5
// leaves 中只包含字符 'r' 和字符 'y'

/**
 * @param {string} leaves
 * @return {number}
 */
var minimumOperations = function(leaves) {
  // 这里要注意一下
  // 0、如果fill一个引用对象，那么他们fill的其实是同一个引用
  // 1、map无法遍历empty的数组，所以这里先fill了一个1
  let dp = new Array(leaves.length).fill(1).map(_ => [])
  // i表示，在0至i的区间内
  // j包含三种含义，0表示当前归属于前部分的红色位，1表示归属于中间的黄色位，2表示归属于后部分的红色位
  // dp[i][j]表示在0至i的区间内，如果当前最后一位属于0|1|2部分时，需要调整的最小次数

  // dp[0][0]表示第0位
  dp[0][0] = leaves[0] === 'y' ? 1 : 0
  dp[0][1] = dp[0][2] = dp[1][2] = Infinity
  for (let i = 1; i < leaves.length; i++) {
    let isYellow = leaves[i] === 'y' ? 1 : 0
    // 当前位置如果归属于前部分的红色位，那么调整的次数即为dp[i - 1]加上判断当前位是否需要调整
    dp[i][0] = dp[i - 1][0] + isYellow
    // 如果当前位置归属于中间的黄色位，那么前面一位必须为红色位，或者黄色位，取调整次数较少的那种选择
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][1]) + +!isYellow
    if (i > 1) {
      // 如果当前位置归属于后部分的黄色位，那么前面一位可以依然为黄色位，或者为属于后部分的红色位，取调整次数较少的那种选择
      dp[i][2] = Math.min(dp[i - 1][2], dp[i - 1][1]) + isYellow
    }
  }
  return dp[leaves.length - 1][2]
};

// 解题思路：动态规划
// 详细见注释，注释即为状态转移方程
// 如果是第一次做，感觉真的很难想到使用动态规划来做这个题。。
