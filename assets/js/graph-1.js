// graph-1

// 设置常数
var MARGIN_1 = { top: 50, right: 30, bottom: 50, left: 30 }
var WIDTH_1 = 1000 - MARGIN_1.left - MARGIN_1.right
var HEIGHT_1 = 230 - MARGIN_1.top - MARGIN_1.bottom

var startyr_1 = 1900
var endyr_1 = 2020

// 子图1
var svg_1a = d3.select("#graph-1a")
    .append("svg")
    .attr("width", WIDTH_1 + MARGIN_1.left + MARGIN_1.right)
    .attr("height", HEIGHT_1 + MARGIN_1.top + MARGIN_1.bottom)
    // .style("border", "1px solid blue")
    .append("g")
    .attr("transform", "translate(" + MARGIN_1.left + "," + MARGIN_1.top + ")");

// // 加入框，方便看画板大小
// var border_1 = svg_1a
//     .append("rect")
//     .attr("width", WIDTH_1)
//     .attr("height", HEIGHT_1)
//     .attr("stroke", "green")
//     .attr("stroke-width", 1)
//     .attr("fill", "none")

// 读入数据
d3.csv('assets/data/chemistry_data_g1.csv').then(function (data) {

    var maxCum = 1213
    var avgCum = 162.9

    // 学科标题
    svg_1a.append("text")
        .text("Chemistry")
        .attr("x", 0)
        .attr("y", 0)
        .attr("font-weight", "bold");

    // //  初始x轴比例尺
    // var xScale_1 = d3.scaleLinear()
    //     .range([0, WIDTH_1])
    //     .domain([0, 0]);

    //  初始x轴比例
    var xScale_1 = d3.scaleLinear()
        .range([0, WIDTH_1])
        .domain([startyr_1, endyr_1]);

    // x轴
    var xAxis_1 = d3.axisBottom(xScale_1)
        .tickValues(d3.range(startyr_1, endyr_1 + 0.1).filter(function (d, i) { return !(d % 10); }))
        .tickFormat(d3.format("d"))
        .tickPadding([10]);

    // 添加x轴
    svg_1a.append("g")
        .attr("class", "xAxis_1")
        .attr("transform", "translate(0," + HEIGHT_1 + ")")
        .transition()
        .duration(2000)
        .style("opacity", "1")
        .call(xAxis_1);

    // 改变x轴标签字体大小
    svg_1a.select(".xAxis_1")
        .selectAll("text")
        .style("font-size", "12px")

    //  y轴比例尺
    var yScale_1 = d3.scaleLinear()
        .range([HEIGHT_1, 0])
        .domain([0, Math.ceil(maxCum / 5) * 5]);

    /*
    // y轴
    var yAxis_1 = d3.axisLeft(yScale_1)

    // 添加y轴
    svg_1a.append("g")
    .call(yAxis_1);
    */

    // 鼠标覆盖事件
    var mouseover = function (event, d) {
        // 改变散点颜色
        d3.select(this).style("fill", function (d) {
            if (d.Paper_cum == maxCum) {
                return "#db3030";
            }
            return "#0c7cab";
        });
        // 显示工具提示
        var tooltip = d3.select("#tooltip_1a");
        tooltip
            .style("visibility", "visible")
            .html(d.Laureate_name + " had published " + d.Paper_cum + " papers in " + d.Pub_duration + " years<br>before he/she won the Nobel prize in " + d.Prize_year + ".")
    }

    // 提示框位置
    var mousemove = function (event, d) {
        var tooltip = d3.select("#tooltip_1a");
        var parentY = $("#graph-1a").offset().top
        tooltip
            .style("left", event.pageX + 20 + "px")
            .style("top", event.pageY - parentY + "px");
    }

    // 鼠标移开事件
    var mouseleave = function (event, d) {
        // 恢复散点颜色
        d3.select(this).style("fill", function (d) {
            if (d.Paper_cum == maxCum) {
                return "#fc6d6d";
            }
            return "#86c2db";
        });
        // 隐藏提示框
        var tooltip = d3.select("#tooltip_1a");
        tooltip.style("visibility", "hidden")
    }

    // // 添加提示框
    // var tooltip = d3.select("#graph-1a")
    //     .append("div")
    //     .style("opacity", 0)
    //     .attr("class", "tooltip_1")
    //     .style('position', 'absolute')
    //     .style("background-color", "white")
    //     .style("border", "solid")
    //     .style("border-width", "1px")
    //     .style("border-radius", "5px")
    //     .style("padding", "10px");

    // 添加散点
    svg_1a.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        // .attr("cx", function (d) { return xScale_1(d.Prize_year); })
        // .attr("cy", function (d) { return yScale_1(d.Paper_cum); })
        .attr("r", function (d) { return Math.log(HEIGHT_1 - yScale_1(d.Paper_cum) + 1); })
        .style('fill', function (d) {
            if (d.Paper_cum == maxCum) {
                return "#fc6d6d";
            }
            return "#86c2db";
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    // //  显示x轴
    // xScale_1.domain([startyr_1, endyr_1])
    // svg_1a.select(".Xaxis_1")
    //     .transition()
    //     .duration(2000)
    //     .call(xAxis_1)
    //     .attr("opacity", "1");

    // 显示散点
    svg_1a.selectAll("circle")
        .transition()
        .delay(function (d, i) { return (i * 3) })
        .duration(2000)
        .attr("cx", function (d) { return xScale_1(d.Prize_year); })
        .attr("cy", function (d) { return yScale_1(d.Paper_cum); })

    // 添加平均线
    svg_1a.append('line')
        .transition()
        .delay(function (d, i) { return (i * 3) })
        .duration(2000)
        .attr('x1', xScale_1(startyr_1))
        .attr('y1', yScale_1(avgCum))
        .attr('x2', xScale_1(endyr_1))
        .attr('y2', yScale_1(avgCum))
        .attr("stroke-width", 1)
        .attr("stroke", "black")
        .attr("fill", "none")
        .style("stroke-dasharray", ("3, 3"));

    // 平均线文本
    svg_1a.append("text")
        .text("Average cumulative publications: " + avgCum)
        .attr("x", xScale_1(startyr_1))
        .attr("y", yScale_1(avgCum) - 10);
});

// 子图2
var svg_1b = d3.select("#graph-1b")
    .append("svg")
    .attr("width", WIDTH_1 + MARGIN_1.left + MARGIN_1.right)
    .attr("height", HEIGHT_1 + MARGIN_1.top + MARGIN_1.bottom)
    .append("g")
    .attr("transform", "translate(" + MARGIN_1.left + "," + MARGIN_1.top + ")");

// 读入数据
d3.csv('assets/data/medicine_data_g1.csv').then(function (data) {

    // console.log(data)

    var maxCum = 949
    var avgCum = 85.3

    // 学科标题
    svg_1b.append("text")
        .text("Medicine & Physiology")
        .attr("x", 0)
        .attr("y", 0)
        .attr("font-weight", "bold");

    // //  初始x轴比例尺
    // var xScale_1 = d3.scaleLinear()
    //     .range([0, WIDTH_1])
    //     .domain([0, 0]);

    //  初始x轴比例尺
    var xScale_1 = d3.scaleLinear()
        .range([0, WIDTH_1])
        .domain([startyr_1, endyr_1]);

    // x轴
    var xAxis_1 = d3.axisBottom(xScale_1)
        .tickValues(d3.range(startyr_1, endyr_1 + 0.1).filter(function (d, i) { return !(d % 10); }))
        .tickFormat(d3.format("d"))
        .tickPadding([10]);

    // 添加x轴
    svg_1b.append("g")
        .attr("class", "xAxis_1")
        .attr("transform", "translate(0," + HEIGHT_1 + ")")
        .transition()
        .duration(2000)
        .style("opacity", "1")
        .call(xAxis_1);

    // 改变x轴标签字体大小
    svg_1b.select(".xAxis_1")
        .selectAll("text")
        .style("font-size", "12px")

    //  y轴比例尺
    var yScale_1 = d3.scaleLinear()
        .range([HEIGHT_1, 0])
        .domain([0, Math.ceil(maxCum / 5) * 5]);

    /*
    // y轴
    var yAxis_1 = d3.axisLeft(yScale_1)

    // 添加y轴
    svg_1b.append("g")
    .call(yAxis_1);
    */

    // 鼠标覆盖事件
    var mouseover = function (event, d) {
        // 改变散点颜色
        d3.select(this).style("fill", function (d) {
            if (d.Paper_cum == maxCum) {
                return "#db3030";
            }
            return "#0a9474";
        });
        // 显示工具提示
        var tooltip = d3.select("#tooltip_1b");
        tooltip
            .style("visibility", "visible")
            .html(d.Laureate_name + " had published " + d.Paper_cum + " papers in " + d.Pub_duration + " years<br>before he/she won the Nobel prize in " + d.Prize_year + ".")
    }

    // 提示框位置
    var mousemove = function (event, d) {
        var tooltip = d3.select("#tooltip_1b");
        var parentY = $("#graph-1b").offset().top;
        tooltip
            .style("left", event.pageX + 20 + "px")
            .style("top", (event.pageY - parentY) + "px");
    }

    // 鼠标移开事件
    var mouseleave = function (event, d) {
        // 恢复散点颜色
        d3.select(this).style("fill", function (d) {
            if (d.Paper_cum == maxCum) {
                return "#fc6d6d";
            }
            return "#7ec2b2";
        });
        // 隐藏提示框
        var tooltip = d3.select("#tooltip_1b");
        tooltip.style("visibility", "hidden")
    }

    // // 添加提示框
    // var tooltip = d3.select("#graph-1a")
    //     .append("div")
    //     .style("opacity", 0)
    //     .attr("class", "tooltip_1")
    //     .style('position', 'absolute')
    //     .style("background-color", "white")
    //     .style("border", "solid")
    //     .style("border-width", "1px")
    //     .style("border-radius", "5px")
    //     .style("padding", "10px");

    // 添加散点
    svg_1b.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        // .attr("cx", function (d) { return xScale_1(d.Prize_year); })
        // .attr("cy", function (d) { return yScale_1(d.Paper_cum); })
        .attr("r", function (d) { return Math.log(HEIGHT_1 - yScale_1(d.Paper_cum) + 1); })
        .style('fill', function (d) {
            if (d.Paper_cum == maxCum) {
                return "#fc6d6d";
            }
            return "#7ec2b2";
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    // //  显示x轴
    // xScale_1.domain([startyr_1, endyr_1])
    // svg_1b.select(".Xaxis_1")
    //     .transition()
    //     .duration(2000)
    //     .call(xAxis_1)
    //     .attr("opacity", "1");

    // 显示散点
    svg_1b.selectAll("circle")
        .transition()
        .delay(function (d, i) { return (i * 3) })
        .duration(2000)
        .attr("cx", function (d) { return xScale_1(d.Prize_year); })
        .attr("cy", function (d) { return yScale_1(d.Paper_cum); })

    // 添加平均线
    svg_1b.append('line')
        .transition()
        .delay(function (d, i) { return (i * 3) })
        .duration(2000)
        .attr('x1', xScale_1(startyr_1))
        .attr('y1', yScale_1(avgCum))
        .attr('x2', xScale_1(endyr_1))
        .attr('y2', yScale_1(avgCum))
        .attr("stroke-width", 1)
        .attr("stroke", "black")
        .attr("fill", "none")
        .style("stroke-dasharray", ("3, 3"));

    // 平均线文本
    svg_1b.append("text")
        .text("Average cumulative publications: " + avgCum)
        .attr("x", xScale_1(startyr_1))
        .attr("y", yScale_1(avgCum) - 10);
});

// 子图3
var svg_1c = d3.select("#graph-1c")
    .append("svg")
    .attr("width", WIDTH_1 + MARGIN_1.left + MARGIN_1.right)
    .attr("height", HEIGHT_1 + MARGIN_1.top + MARGIN_1.bottom)
    .append("g")
    .attr("transform", "translate(" + MARGIN_1.left + "," + MARGIN_1.top + ")");

// 读入数据
d3.csv('assets/data/physics_data_g1.csv').then(function (data) {

    // console.log(data)

    var maxCum = 612
    var avgCum = 71.9

    // 学科标题
    svg_1c.append("text")
        .text("Physics")
        .attr("x", 0)
        .attr("y", 0)
        .attr("font-weight", "bold");

    // //  初始x轴比例尺
    // var xScale_1 = d3.scaleLinear()
    //     .range([0, WIDTH_1])
    //     .domain([0, 0]);

    //  初始x轴比例尺
    var xScale_1 = d3.scaleLinear()
        .range([0, WIDTH_1])
        .domain([startyr_1, endyr_1]);

    // x轴
    var xAxis_1 = d3.axisBottom(xScale_1)
        .tickValues(d3.range(startyr_1, endyr_1 + 0.1).filter(function (d, i) { return !(d % 10); }))
        .tickFormat(d3.format("d"))
        .tickPadding([10]);

    // 添加x轴
    svg_1c.append("g")
        .attr("class", "xAxis_1")
        .attr("transform", "translate(0," + HEIGHT_1 + ")")
        .transition()
        .duration(2000)
        .style("opacity", "1")
        .call(xAxis_1);

    // 改变x轴标签字体大小
    svg_1c.select(".xAxis_1")
        .selectAll("text")
        .style("font-size", "12px")

    //  y轴比例尺
    var yScale_1 = d3.scaleLinear()
        .range([HEIGHT_1, 0])
        .domain([0, Math.ceil(maxCum / 5) * 5]);

    /*
    // y轴
    var yAxis_1 = d3.axisLeft(yScale_1)

    // 添加y轴
    svg_1c.append("g")
    .call(yAxis_1);
    */

    // 鼠标覆盖事件
    var mouseover = function (event, d) {
        // 改变散点颜色
        d3.select(this).style("fill", function (d) {
            if (d.Paper_cum == maxCum) {
                return "#db3030";
            }
            return "#6a57d4";
        });
        // 显示工具提示
        var tooltip = d3.select("#tooltip_1c");
        tooltip
            .style("visibility", "visible")
            .html(d.Laureate_name + " had published " + d.Paper_cum + " papers in " + d.Pub_duration + " years<br>before he/she won the Nobel prize in " + d.Prize_year + ".")
    }

    // 提示框位置
    var mousemove = function (event, d) {
        var tooltip = d3.select("#tooltip_1c");
        var parentY = $("#graph-1c").offset().top;
        tooltip
            .style("left", event.pageX + 20 + "px")
            .style("top", (event.pageY - parentY) + "px");
    }

    // 鼠标移开事件
    var mouseleave = function (event, d) {
        // 恢复散点颜色
        d3.select(this).style("fill", function (d) {
            if (d.Paper_cum == maxCum) {
                return "#fc6d6d";
            }
            return "#afa6e3";
        });
        // 隐藏提示框
        var tooltip = d3.select("#tooltip_1c");
        tooltip.style("visibility", "hidden")
    }

    // // 添加提示框
    // var tooltip = d3.select("#graph-1a")
    //     .append("div")
    //     .style("opacity", 0)
    //     .attr("class", "tooltip_1")
    //     .style('position', 'absolute')
    //     .style("background-color", "white")
    //     .style("border", "solid")
    //     .style("border-width", "1px")
    //     .style("border-radius", "5px")
    //     .style("padding", "10px");

    // 添加散点
    svg_1c.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        // .attr("cx", function (d) { return xScale_1(d.Prize_year); })
        // .attr("cy", function (d) { return yScale_1(d.Paper_cum); })
        .attr("r", function (d) { return Math.log(HEIGHT_1 - yScale_1(d.Paper_cum) + 1); })
        .style('fill', function (d) {
            if (d.Paper_cum == maxCum) {
                return "#fc6d6d";
            }
            return "#afa6e3";
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

    // //  显示x轴
    // xScale_1.domain([startyr_1, endyr_1])
    // svg_1c.select(".Xaxis_1")
    //     .transition()
    //     .duration(2000)
    //     .call(xAxis_1)
    //     .attr("opacity", "1");

    // 显示散点
    svg_1c.selectAll("circle")
        .transition()
        .delay(function (d, i) { return (i * 3) })
        .duration(2000)
        .attr("cx", function (d) { return xScale_1(d.Prize_year); })
        .attr("cy", function (d) {
            // 处理重叠点
            if (d.Paper_cum == maxCum) {
                return yScale_1(10 + Math.ceil(maxCum / 5) * 5);
            }
            return yScale_1(d.Paper_cum);
        })

    // 添加平均线
    svg_1c.append('line')
        .transition()
        .delay(function (d, i) { return (i * 3) })
        .duration(2000)
        .attr('x1', xScale_1(startyr_1))
        .attr('y1', yScale_1(avgCum))
        .attr('x2', xScale_1(endyr_1))
        .attr('y2', yScale_1(avgCum))
        .attr("stroke-width", 1)
        .attr("stroke", "black")
        .attr("fill", "none")
        .style("stroke-dasharray", ("3, 3"));

    // 平均线文本
    svg_1c.append("text")
        .text("Average cumulative publications: " + avgCum)
        .attr("x", xScale_1(startyr_1))
        .attr("y", yScale_1(avgCum) - 10);
});