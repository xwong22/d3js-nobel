// 设置常数
var MARGIN_6 = { top: 40, right: 60, bottom: 60, left: 60 };
var WIDTH_6 = 1400 - MARGIN_6.left - MARGIN_6.right;
var HEIGHT_6 = 600 - MARGIN_6.top - MARGIN_6.bottom;

var CENTRE_6 = 260;

var IMAGE_WIDTH_6 = 100;
var IMAGE_HEIGHT_6 = 100;
var bar_color_6 = '#ff7f51';

// // 创建svg
// var svg_6 = d3.select("#container_6")
//   .append("svg")
//   .attr("width", WIDTH_6 + MARGIN_6.left + MARGIN_6.right)
//   .attr("height", HEIGHT_6 + MARGIN_6.top + MARGIN_6.bottom)
//   .attr("style", "border:1px solid blue");

// 创建svg
var svg_6 = d3.select("#container_6")
  .append("svg")
  .attr("width", WIDTH_6)
  .attr("height", HEIGHT_6)
  // .attr("width", '100%')
  // .attr("height", '100%')
  .attr("viewBox", "0 0 " + (WIDTH_6 + MARGIN_6.left + MARGIN_6.right) + " " + (HEIGHT_6 + MARGIN_6.top + MARGIN_6.bottom))
  .attr("preserveAspectRatio", "xMidYMid meet")
  // .attr("style", "border:1px solid blue")
  .append("g")
  .attr("transform", "translate(" + MARGIN_6.left + "," + MARGIN_6.top + ")");

// // 加入框，方便看画板大小
// var border_6 = svg_6
//   .append("rect")
//   .attr("width", WIDTH_6)
//   .attr("height", HEIGHT_6)
//   .attr("stroke", "green")
//   .attr("stroke-width", 1)
//   .attr("fill", "none");

d3.csv("assets/data/prize_pub_year_all.csv").then(function (dataset) {
  // 把数据转成数值形式
  dataset.forEach(function (d) {
    d.prize_pub_year = +d.prize_pub_year;
    d.paper_count = +d.paper_count;
  });

  // 定义x轴的比例尺(序数比例尺)
  var xScale_6 = d3
    .scaleBand()
    .domain(dataset.map(function (d) { return d.prize_pub_year; }))
    .range([0, WIDTH_6])
    .padding(0.1);

  var yScale_6 = d3
    .scaleLinear()
    .domain([0, d3.max(dataset, function (d) { return d.paper_count; })])
    .range([HEIGHT_6, 0]);

  // 定义x轴和y轴
  // 创建x轴
  var xAxis_6 = d3.axisBottom(xScale_6);

  // 创建y轴
  var yAxis_6 = d3.axisLeft(yScale_6);

  // 绘制x轴
  svg_6
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + HEIGHT_6 + ")")
    .call(xAxis_6);

  // 绘制y轴
  svg_6.append("g").attr("class", "y-axis").call(yAxis_6);

  var bars_6 = svg_6
    .selectAll(".bar")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function (d) { return xScale_6(d.prize_pub_year); })
    .attr("y", function (d) { return yScale_6(d.paper_count); })
    .attr("width", xScale_6.bandwidth())
    .attr("height", function (d) { return HEIGHT_6 - yScale_6(d.paper_count); })
    .attr("fill", bar_color_6)
    .attr("opacity", 0.7);

  // 添加鼠标悬停事件处理程序
  bars_6
    .on("mouseover", function (event, d) {
      var paperCount = d.paper_count;
      var yearsWaited = d.prize_pub_year;

      // // 在控制台打印信息
      // console.log("Paper Count: " + paperCount);
      // console.log("Years Waited: " + yearsWaited);

      // 将当前柱子设置为悬停状态的样式
      d3.select(this).style("fill", "blue");

      // 在页面上显示信息
      var tooltip = d3.select("#tooltip_6");
      tooltip
        .text("Years Waited " + yearsWaited + ", Paper Count: " + paperCount)
        .style("visibility", "visible");

      // 获取当前柱子的位置和大小
      var rect = this.getBoundingClientRect();
      var barWidth = rect.width;
      var barHeight = rect.height;
      var barX = rect.x;
      var barY = rect.y;

      // 计算提示框的位置
      var tooltipWidth = tooltip.node().getBoundingClientRect().width;
      var tooltipHeight = tooltip.node().getBoundingClientRect().height;
      var tooltipX = barX + (barWidth - tooltipWidth) / 2;
      var tooltipY = barY + (barHeight - tooltipHeight) / 2;

      tooltip
        .style("left", tooltipX + "px")
        .style("top", tooltipY + "px");
    })
    .on("mouseout", function () {
      // 将柱子恢复原始颜色
      d3.select(this).style("fill", bar_color_6);

      // 隐藏提示信息
      d3.select("#tooltip_6").style("visibility", "hidden");
    });

  //   // 检查按钮是否已经存在
  //   var sortButton = d3.select("#sort-button");
  //   if (sortButton.empty()) {
  //     // 创建排序按钮
  //     sortButton = d3
  //       .select("#container_6")
  //       .append("button")
  //       .attr("id", "sort-button");
  //   }

  // 定义排序顺序变量
  var sortOrder = "ascending";

  // 检查按钮是否已经存在
  var sortButton = d3.select("#sort-button");
  if (!sortButton.empty()) {
    sortButton.remove();
  }

  // 创建排序按钮
  sortButton = d3
    .select("#button_div_6")
    .append("button")
    .attr("class", "custom-button")
    .attr("id", "sort-button");

  // 更新按钮文本
  var buttonLabel = sortOrder === "ascending" ? "Sort Descending" : "Sort Ascending";
  sortButton.text(buttonLabel);

  // 添加点击事件处理程序
  sortButton.on("click", function () {
    // 切换排序顺序
    sortOrder = sortOrder === "ascending" ? "descending" : "ascending";

    // 更新按钮文本
    var buttonLabel = sortOrder === "ascending" ? "Sort Descending" : "Sort Ascending";
    sortButton.text(buttonLabel);

    // 根据排序顺序更新数据
    dataset.sort(function (a, b) {
      if (sortOrder === "ascending") {
        return a.paper_count - b.paper_count;
      } else {
        return b.paper_count - a.paper_count;
      }
    });

    // 更新x轴的域和比例尺
    xScale_6.domain(dataset.map(function (d) { return d.prize_pub_year; }));

    // 重新绑定数据并更新柱子的位置和高度
    bars_6
      .data(dataset)
      .transition()
      // .duration(500)
      .attr("x", function (d) { return xScale_6(d.prize_pub_year); })
      .attr("y", function (d) { return yScale_6(d.paper_count); })
      .attr("height", function (d) { return HEIGHT_6 - yScale_6(d.paper_count); });

    // 更新x轴
    svg_6.select(".x-axis")
      .transition()
      // .duration(500)
      .call(xAxis_6);
  });


  // 保存原始数据的副本
  var originalData = dataset.slice();
  // 检查恢复默认排序按钮是否已经存在
  var resetButton = d3.select("#reset-button");
  if (!resetButton.empty()) {
    resetButton.remove();
  }

  // 创建恢复默认排序按钮
  resetButton = d3
    .select("#button_div_6")
    .append("button")
    .attr("class", "custom-button")
    .attr("id", "reset-button")
    .text("Reset");

  // 添加点击事件处理程序
  resetButton.on("click", function () {
    // 恢复原始数据的顺序
    dataset = originalData.slice();

    // 更新x轴的域和比例尺
    xScale_6.domain(dataset.map(function (d) { return d.prize_pub_year; }));

    // 重新绑定数据并更新柱子的位置和高度
    bars_6
      .data(dataset)
      .transition()
      // .duration(500)
      .attr("x", function (d) { return xScale_6(d.prize_pub_year); })
      .attr("y", function (d) { return yScale_6(d.paper_count); })
      .attr("height", function (d) { return HEIGHT_6 - yScale_6(d.paper_count); });

    // 更新x轴
    svg_6.select(".x-axis")
      .transition()
      // .duration(500)
      .call(xAxis_6);
  });

  // 创建y轴标签
  var yLabel_6 = svg_6
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -HEIGHT_6 / 2)
    .attr("y", -MARGIN_6.left + 20 + "px")
    .style("font-size", "20px")
    .style("text-anchor", "middle")
    .text("Quantity of Awarded Article");

  // 创建x轴标签
  var xLabel_6 = svg_6
    .append("text")
    .attr("class", "axis-label")
    .attr("x", WIDTH_6 / 2 + "px")
    .attr("y", HEIGHT_6 + 40 + "px")
    // .attr("dy", "1em")
    .style("font-size", "20px")
    .style("text-anchor", "middle")
    .text("Publication-Award Gap (Years)");

  // 添加平均线
  var averagePaperCount = d3.mean(dataset, function (d) {
    return d.paper_count;
  });
  // 添加文献数量的均值线
  svg_6
    .append("line")
    .attr("class", "average-line")
    .attr("x1", 0)
    .attr("y1", yScale_6(averagePaperCount))
    .attr("x2", WIDTH_6)
    .attr("y2", yScale_6(averagePaperCount))
    .style("stroke", "red")
    .style("stroke-width", 1.5)
    .style("stroke-dasharray", "5,5")
    .style("stroke", "blue");

  // 在平均线的最右侧上方添加文本
  svg_6.append("text")
    .attr("class", "average-label")
    .attr("x", xScale_6(dataset[dataset.length - 1].prize_pub_year) + xScale_6.bandwidth() / 2)
    .attr("y", yScale_6(averagePaperCount) - 5) // 上移一些距离以避免与平均线重叠
    .attr("text-anchor", "end")
    .text("Average article count: " + averagePaperCount.toFixed(2))
    .style("font-size", "15px");
});


